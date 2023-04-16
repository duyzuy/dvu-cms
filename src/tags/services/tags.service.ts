import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  createTag(params: { name: string; slug: string; createdAt: Date }) {
    const tag = new Tag();
    tag.name = params.name;
    tag.slug = params.slug;
    tag.createdAt = params.createdAt;

    return this.tagRepository.save(tag);
  }

  async getAllTags(query: {
    take?: number;
    page?: number;
    keyword?: string;
  }): Promise<{
    data: Tag[];
    total: number;
    perPage: number;
    currentPage: number;
    totalPage: number;
  }> {
    const take = query.take || 10;
    const page = query.page || 1;

    const skip = (page - 1) * take;

    const [data, count] = await this.tagRepository
      .createQueryBuilder()
      .orderBy('createdAt', 'DESC')
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
  getOne(id: string) {
    return this.tagRepository.findOneByOrFail({ id });
  }

  async updateOne(
    id: string,
    params: { name: string; slug: string; updatedAt: Date },
  ) {
    try {
      const tag = await this.tagRepository.findOneByOrFail({ id });

      if (tag) {
        const isExistsSlug = await this.tagRepository
          .createQueryBuilder()
          .where('slug = :slug AND id != :id', { slug: params.slug, id: id })
          .getExists();

        if (isExistsSlug) {
          return {
            status: 'error',
            message: 'Slug is already exists.',
          };
        } else {
          tag.name = params.name;
          tag.slug = params.slug;
          tag.updatedAt = params.updatedAt;
        }

        return await this.tagRepository.save(tag);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteOne(id: string) {
    return await this.tagRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
