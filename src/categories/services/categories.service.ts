import {
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    try {
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
    } catch (error) {
      throw new ForbiddenException('Get all post fail.');
    }
  }

  async getCategoriesByIds(ids: string[]) {
    const queryBuilder = this.categoryRepository.createQueryBuilder();

    return await queryBuilder
      .where('id IN (:...categories)', { categories: ids })
      .orderBy('createdAt', 'DESC')
      .getMany();
  }

  async getOneById(id: string) {
    const queryBuilder = this.categoryRepository.createQueryBuilder();

    return await queryBuilder
      .where('id = :id', { id })
      .getOne()
      .then((data) => data)
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  create({
    name,
    slug,
    status,
    thumbnail,
    description,
    createdAt,
  }: CategoryCreateParams) {
    try {
      const category = new Category();

      category.name = name;
      category.slug = slug;
      category.status = status;
      category.thumbnail = thumbnail;
      category.description = description;
      category.createdAt = createdAt || new Date();

      return this.categoryRepository.save(category);
    } catch (error) {
      throw new ForbiddenException('Create category fail/');
    }
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
    return await this.categoryRepository
      .findOneByOrFail({ id })
      .then(async (category) => {
        const queryBuilder = this.categoryRepository.createQueryBuilder();

        const isExistsSlug = await queryBuilder
          .where('id != :id AND slug = :slug', {
            id: category.id,
            slug: params.slug,
          })
          .getExists();

        if (isExistsSlug) {
          return {
            statusCode: HttpStatus.CONFLICT,
            message: 'Slug already exists.',
          };
        } else {
          const updateCat = await queryBuilder
            .update()
            .set({
              name: params.name,
              slug: params.slug,
              description: params.description,
              updatedAt: params.updatedAt,
            })
            .where('id = :id', { id: category.id })
            .execute();

          if (updateCat.affected === 1) {
            return await queryBuilder
              .where('id = :id', { id: category.id })
              .getOne();
          } else {
            return {
              statusCode: HttpStatus.FORBIDDEN,
              message: 'Update fail',
            };
          }
        }
      })
      .catch((error) => {
        console.log(error);
        throw new NotFoundException('Category not found');
      });
  }

  async deleteOne(id: string) {
    const queryBuilder = this.categoryRepository.createQueryBuilder();
    try {
      return await queryBuilder.where('id = :id', { id }).execute();
    } catch (error) {
      throw new ForbiddenException('Delete category fail');
    }
  }
}
