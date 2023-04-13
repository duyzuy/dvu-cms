import {
  Body,
  Controller,
  Get,
  Res,
  Post,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(@Res() res: Response) {
    const posts = await this.postsService.getAllPosts();

    res.send({
      data: posts,
      message: 'Get posts success',
    });
  }

  @Post()
  async create(@Res() res: Response, @Body() createPostDto: CreatePostDto) {
    const newPost = await this.postsService.createPost({
      ...createPostDto,
    });

    if (newPost) {
      res.send({
        data: newPost,
        message: 'Create Post success',
      });
    }
  }

  @Get(':id')
  async getPostById(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const post = await this.postsService.getPostById(id);
  }
  @Get(':slug')
  async getPostBySlug(@Res() res: Response, @Param('slug') slug: string) {}
}
