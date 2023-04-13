import { IsNotEmpty } from 'class-validator';
import { PostStatus, PostTypes } from 'src/utils/types';
import { Unique } from 'src/utils/UniqueValidation';
import { Post } from '../entities/post.entity';
export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @Unique(Post)
  slug: string;

  @IsNotEmpty()
  thumbnail: string;

  description: string;

  shortDescription: string;

  @IsNotEmpty()
  status: PostStatus;

  @IsNotEmpty()
  postType: PostTypes;

  @IsNotEmpty()
  categories: string;

  @IsNotEmpty()
  tags: string;

  createdAt: string;

  updateAt: string;
}
