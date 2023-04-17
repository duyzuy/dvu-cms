import { Category } from 'src/categories/interfaces/category.interface';
import { Tag } from 'src/tags/interfaces/tag.interface';
import { User } from 'src/users/entities/user.entity';
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
  categories: Pick<Category, 'id'>[];
  tags?: Pick<Tag, 'id'>[];
  createdAt: Date;
  updatedAt?: Date;
  userId: Pick<User, 'id'>;
}

export type PostInterface = Pick<
  Post,
  'id' | 'slug' | 'status' | 'shortDescription' | 'thumbnail'
>;
export type PostCreateParams = Omit<Post, 'id' | 'categories' | 'tags'> & {
  tags: Pick<Tag, 'id'>[];
  categories: Pick<Category, 'id'>[];
};
