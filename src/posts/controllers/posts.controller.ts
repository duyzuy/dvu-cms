import {
  Body,
  Controller,
  Get,
  Res,
  Post,
  ParseUUIDPipe,
  Param,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsService } from '../services/posts.service';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/users/interfaces/user.interface';
@Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(@Res() res: Response) {
    const posts = await this.postsService.getAllPosts({
      page: 1,
      take: 10,
    });

    res.send({
      data: posts,
      message: 'Get posts success',
    });
  }

  @Post()
  async create(
    @Res() res: Response,
    @Req() req,
    @Body() createPostDto: CreatePostDto,
  ) {
    const newPost = await this.postsService.createPost({
      ...createPostDto,
      userId: req?.user?.id,
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
