import { PostStatus, PostTypes } from 'src/utils/types';
export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  status: PostStatus;
  postType: PostTypes;
  categories: string[];
  tags: string[];
  createdAt: string;
  updateAt: string;
}
