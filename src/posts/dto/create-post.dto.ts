import { IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/interfaces/tag.interface';
import { PostStatus, PostTypes } from 'src/utils/types';
import { Unique } from 'src/utils/UniqueValidation';
import { Post } from '../entities/post.entity';
export class CreatePostDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Unique(Post)
  slug: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsOptional()
  description: string;

  @IsOptional()
  shortDescription: string;

  @IsNotEmpty()
  status: PostStatus;

  @IsNotEmpty()
  postType: PostTypes;

  @IsNotEmpty()
  categories: string[];

  @IsNotEmpty()
  tags: string[];

  @IsOptional()
  userId: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updateAt: Date;
}
