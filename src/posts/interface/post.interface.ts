import { Category } from 'src/categories/interfaces/category.interface';
import { Tag } from 'src/tags/interfaces/tag.interface';
import { PostStatus, PostTypes } from 'src/utils/types';

export interface Post {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  description: string;
  shortDescription: string;
  status: PostStatus;
  postType: PostTypes;
  categories: Pick<Category, 'id' | 'name' | 'slug' | 'status'>[];
  // tags: Pick<Tag, 'id' | 'name' | 'slug' | 'status'>[];
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
}

export type PostInterface = Pick<
  Post,
  'id' | 'slug' | 'status' | 'shortDescription' | 'thumbnail'
>;
export type PostCreateParams = Omit<Post, 'id'>;
