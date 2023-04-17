import {
  Controller,
  Get,
  Res,
  Query,
  Post,
  Body,
  HttpStatus,
  Put,
  ParseUUIDPipe,
  Param,
  ParseArrayPipe,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { Response } from 'express';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../dto/create-category.dto';
import { removeScriptTag, removeSpecialChar } from 'src/helpers/regex';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/users/interfaces/user.interface';
import { PostsService } from 'src/posts/services/posts.service';
@Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
@Controller('categories')
export class CategoriesController {
  constructor(
    private categoryService: CategoriesService,
    private postService: PostsService,
  ) {}

  @Get()
  async index(@Res() res: Response, @Query() { page, perPage }) {
    const cataData = await this.categoryService.getAll({
      take: Number(perPage),
      page: Number(page),
    });

    res.send({
      data: {
        list: cataData.data,
        currentPage: cataData.currentPage,
        perPage: cataData.perPage,
        totalPage: cataData.totalPage,
        total: cataData.total,
      },
      status: 'success',
    });
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    console.log({ createCategoryDto });
    const name = removeSpecialChar(createCategoryDto.name);
    const description = removeScriptTag(createCategoryDto.description);
    const slug = removeSpecialChar(createCategoryDto.slug);
    const caregory = await this.categoryService.create({
      name: name,
      slug: slug,
      description: description,
      status: createCategoryDto.status,
      thumbnail: createCategoryDto.thumbnail,
      createdAt: createCategoryDto.createdAt || new Date(),
    });

    res.status(HttpStatus.CREATED).send({
      status: 'succes',
      data: caregory,
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const name = removeSpecialChar(updateCategoryDto.name);
    const description = removeScriptTag(updateCategoryDto.description);
    const slug = removeSpecialChar(updateCategoryDto.slug);

    const data = await this.categoryService.updateOne(id, {
      name: name,
      slug: slug,
      description: description,
      updatedAt: new Date(),
    });

    res.send(data);
  }

  @Get(':id')
  async getDetail(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const category = await this.categoryService.getOneById(id);
    if (category) {
      res.send(category);
    } else {
      res.send({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Category not found.',
      });
    }
  }

  @Post('many')
  async getManyCategoryById(@Body() ids: string[], @Res() res: Response) {
    if (!ids) {
      res.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'ids must be in array string',
      });
    } else {
      const categories = await this.categoryService.getCategoriesByIds(ids);
      if (categories.length > 0) {
        res.send(categories);
      } else {
        res.send({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Category not found.',
        });
      }
    }
  }
  @Get(':id/posts')
  async getPostsBycategoryId(@Param() id: ParseUUIDPipe, @Res() res: Response) {
    // const posts = await this.postService.getPostsByCategoryId(id);
    // console.log(posts);
  }
}
