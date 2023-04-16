import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { PostCreateParams } from '../interface/post.interface';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async getAllPosts(query: {
    take?: number;
    page?: number;
    order?: 'DESC' | 'ASC';
  }) {
    const take = query.take || 10;
    const page = query.page || 1;
    const order = query.order || 'DESC';

    const skip = (page - 1) * take;

    const [data, count] = await this.postsRepository
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

  async createPost(postData: PostCreateParams) {
    try {
      const newPost = new Post();
      newPost.name = postData.name;
      newPost.slug = postData.slug;
      newPost.description = postData.description;
      newPost.shortDescription = postData.shortDescription;
      newPost.categories = postData.categories;
      newPost.status = postData.status;
      newPost.postType = postData.postType;
      newPost.thumbnail = postData.thumbnail;
      newPost.createdAt = postData.createdAt;
      newPost.userId = postData.userId;
      return await this.postsRepository.save(newPost);
    } catch (error) {
      throw new ForbiddenException('create post fail');
    }
  }

  getPostById(id: string): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }

  getPostBySlug(slug: string): Promise<Post> {
    return this.postsRepository.findOneBy({ slug });
  }
}
