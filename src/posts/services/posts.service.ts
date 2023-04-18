import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { PostCreateParams } from '../interface/post.interface';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { CategoriesService } from 'src/categories/services/categories.service';
import { TagsService } from 'src/tags/services/tags.service';
import { UsersService } from 'src/users/users.service';
import { dataSource } from 'database/data-source';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private categoryService: CategoriesService,
    private tagService: TagsService,
    private userService: UsersService,
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

    const [data, count] = await dataSource
      .getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'category')
      .getManyAndCount();

    // const [data, count] = await this.postsRepository
    //   .createQueryBuilder()
    //   .leftJoinAndSelect('categories', 'category')
    //   .orderBy('createdAt', order)
    //   .take(take)
    //   .skip(skip)
    //   .getManyAndCount();

    if (data.length > 0) {
      return {
        lists: data,
        total: count,
        perPage: take,
        currentPage: page,
        totalPage: Math.ceil(count / take),
      };
    } else {
      throw new NotFoundException('Not found post');
    }
  }

  async createPost({
    name,
    slug,
    description,
    shortDescription,
    categories,
    tags,
    status,
    postType,
    thumbnail,
    createdAt,
    userId,
  }: CreatePostDto) {
    try {
      const newPost = new Post();
      newPost.name = name;
      newPost.slug = slug;
      newPost.description = description;
      newPost.shortDescription = shortDescription;
      newPost.status = status;
      newPost.postType = postType;
      newPost.thumbnail = thumbnail;
      newPost.createdAt = createdAt;

      let catList = [];
      let tagList = [];

      const tagPromises = tags.map(
        async (tagId) => await this.tagService.getOneById(tagId),
      );
      const categoryPromises = categories.map(
        async (catId) => await this.categoryService.getOneById(catId),
      );
      tagList = await Promise.all(tagPromises);
      catList = await Promise.all(categoryPromises);

      const user = await this.userService.findOne(userId);
      newPost.categories = catList;
      newPost.tags = tagList;
      newPost.userId = user;

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
  async getPostsByCategoryId(id: ParseUUIDPipe) {
    const queryBuilder = this.postsRepository.createQueryBuilder();
    return await queryBuilder
      .leftJoinAndSelect('categories', 'category')
      .getMany();
  }
}
