import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  createPost(postData: any) {
    const newPost = this.postsRepository.create({
      ...postData,
    });

    return this.postsRepository.save(newPost);
  }

  getPostById(id: string): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }

  getPostBySlug(slug: string): Promise<Post> {
    return this.postsRepository.findOneBy({ slug });
  }
}
