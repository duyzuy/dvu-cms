import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CategoryCreateParams } from '../interfaces/category.interface';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAll(query: {
    take?: number;
    page?: number;
    order?: 'DESC' | 'ASC';
  }) {
    const take = query.take || 10;
    const page = query.page || 1;
    const order = query.order || 'DESC';

    const skip = (page - 1) * take;

    const [data, count] = await this.categoryRepository
      .createQueryBuilder()
      .orderBy('createdAt', order)
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return {
      data: data,
      total: count,
      perPage: take,
      currentPage: page,
      totalPage: Math.ceil(count / take),
    };
  }

  getOneById(id: string) {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  create({
    name,
    slug,
    status,
    thumbnail,
    description,
    createdAt,
  }: CategoryCreateParams) {
    const category = new Category();

    category.name = name;
    category.slug = slug;
    category.status = status;
    category.thumbnail = thumbnail;
    category.description = description;
    category.createdAt = createdAt || new Date();

    return this.categoryRepository.save(category);
  }

  async updateOne(
    id: string,
    params: {
      name: string;
      slug: string;
      description: string;
      updatedAt: Date;
    },
  ) {
    try {
      const category = await this.categoryRepository.findOneByOrFail({ id });

      if (category) {
        const isExistsSlug = await this.categoryRepository
          .createQueryBuilder()
          .where('slug = :slug AND id != :id', { slug: params.slug, id: id })
          .getExists();

        if (isExistsSlug) {
          return {
            status: 'error',
            message: 'Slug is already exists.',
          };
        } else {
          category.name = params.name;
          category.slug = params.slug;
          category.description = params.description;
          category.updateAt = params.updatedAt;
        }

        return await this.categoryRepository.save(category);
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteOne(id: string) {
    return this.categoryRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
