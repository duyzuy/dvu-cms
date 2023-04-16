import { Post } from 'src/posts/interface/post.interface';
import { CategoryStatus } from 'src/utils/types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: CategoryStatus;
  posts: Pick<
    Post,
    'id' | 'name' | 'slug' | 'thumbnail' | 'shortDescription'
  >[];
  thumbnail: string;
  createdAt: Date;
  updateAt: Date;
}

export type CategoryCreateParams = Omit<Category, 'id' | 'updateAt' | 'posts'>;

export type CategoryUpdateParams = Omit<Category, 'id' | 'createdAt' | 'posts'>;
