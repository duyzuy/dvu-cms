import {
  Body,
  Controller,
  Get,
  Res,
  Post,
  ParseUUIDPipe,
  Param,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsService } from '../services/posts.service';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { User, UserRole } from 'src/users/interfaces/user.interface';
import { RequestWithAuth } from 'src/interfaces/request.interface';
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

    res.status(200).send({
      data: posts,
      message: 'Get posts success',
      statsuCode: HttpStatus.OK,
    });
  }

  @Post()
  async create(
    @Res() res: Response,
    @Req() req: RequestWithAuth,
    @Body() createPostDto: CreatePostDto,
  ) {
    const newPost = await this.postsService.createPost({
      ...createPostDto,
      userId: req?.user?.id,
    });

    res.send({
      data: newPost,
      message: 'Created success',
      statusCode: HttpStatus.CREATED,
    });
  }

  @Get(':id')
  async getPostById(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const post = await this.postsService.findOne(id);
    res.send({
      data: post,
      statusCode: HttpStatus.FOUND,
    });
  }
  @Get(':slug')
  async getPostBySlug(@Res() res: Response, @Param('slug') slug: string) {}
}
