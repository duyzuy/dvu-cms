import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostCreateParams } from './interface/post.interface';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  createPost(postData: PostCreateParams) {
    const newPost = new Post();
    newPost.title = postData.title;
    newPost.slug = postData.slug;
    newPost.description = postData.description;
    newPost.shortDescription = postData.shortDescription;
    newPost.thumbnail = postData.thumbnail;
    // newPost.categories = postData.categories;

    return this.postsRepository.save(newPost);
  }

  getPostById(id: string): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }

  getPostBySlug(slug: string): Promise<Post> {
    return this.postsRepository.findOneBy({ slug });
  }
}
