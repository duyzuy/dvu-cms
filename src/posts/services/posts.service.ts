import { ForbiddenException, Injectable } from '@nestjs/common';
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

      const catList = await this.categoryService.getCategoriesByIds([
        ...categories,
      ]);

      const tagList = await this.tagService.getTagsByIds([...tags]);

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
}
