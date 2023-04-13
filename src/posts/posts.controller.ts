import { Body, Controller, Get, Res, Post } from '@nestjs/common';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(@Res() res: Response) {
    const posts = this.postsService.getAllPosts();
    res.send({
      data: posts,
      message: 'Get posts success',
    });
  }

  @Post()
  async create(@Res() res: Response, @Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.createPost({
      ...createPostDto,
    });

    if (post) {
      res.send({
        data: post,
        message: 'Create Post success',
      });
    }
  }
}
