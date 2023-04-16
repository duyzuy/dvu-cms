import { Post } from 'src/posts/interface/post.interface';

export interface Tag {
  id: string;
  name: string;
  slug: string;
  posts: Pick<
    Post,
    'id' | 'slug' | 'status' | 'shortDescription' | 'thumbnail'
  >[];
  createdAt: Date;

  updatedAt?: Date;
}
