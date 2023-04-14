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
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Response } from 'express';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/create-category.dto';
import { removeScriptTag, removeSpecialChar } from 'src/helpers/regex';
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

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

  async update(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
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
    console.log({ data });
    if (data) {
      res.send({
        data,
        status: 'success',
      });
    } else {
      res.send({
        status: 'error',
      });
    }
  }
}
