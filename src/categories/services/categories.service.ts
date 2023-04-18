import {
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CategoryCreateParams } from '../interfaces/category.interface';
import { DataSource } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private dataSource: DataSource,
  ) {}

  async findAll(query: {
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
    try {
      const categoryList = await queryBuilder
        .where('id IN (:...categories)', { categories: ids })
        .orderBy('createdAt', 'DESC')
        .getMany();

      console.log({ categoryList });
      return categoryList;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    const queryBuilder = this.categoryRepository.createQueryBuilder();
    return await queryBuilder.where('id = :id', { id }).getOne();
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

  async update(
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

  async delete(id: string) {
    const queryBuilder = this.categoryRepository.createQueryBuilder();
    try {
      return await queryBuilder.where('id = :id', { id }).execute();
    } catch (error) {
      throw new ForbiddenException('Delete category fail');
    }
  }

  async findPosts(id: ParseUUIDPipe) {
    const category = await this.categoryRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    const posts = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder()
      .take(-1)
      .skip(0)
      .relation(Category, 'posts')
      .of(category)
      .loadMany();
    category.posts = posts;

    return category;
  }
}
