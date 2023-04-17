import {
  Get,
  Post,
  Res,
  Body,
  Query,
  Put,
  ParseUUIDPipe,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { CreateTagDto, UpdateTagDto } from '../dto/create-tag.dto';
import { TagsService } from '../services/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Get()
  async index(@Res() res: Response, @Query() { page, perPage }) {
    const tagData = await this.tagService.getAllTags({
      take: Number(perPage),
      page: Number(page),
    });
    if (tagData.data.length > 0) {
      res.send({
        data: {
          list: tagData.data,
          currentPage: tagData.currentPage,
          perPage: tagData.perPage,
          totalPage: tagData.totalPage,
          total: tagData.total,
        },
        status: 'success',
      });
    } else {
      res.send({
        data: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No tags',
        },
        status: 'success',
      });
    }
  }

  @Get(':id')
  async getDetail(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const tag = await this.tagService.getOneById(id);
    res.send({
      data: tag,
      status: 'success',
    });
  }
  @Post()
  async create(@Res() res: Response, @Body() createTagDto: CreateTagDto) {
    const tag = await this.tagService.createTag({
      name: createTagDto.name,
      slug: createTagDto.slug,
      createdAt: new Date(),
    });
    let message = '';
    let status = '';
    let data = null;
    if (tag) {
      data = tag;
      (status = 'success'), (message = 'create success');
    } else {
      status = 'error';
      message = 'create fail';
    }
    res.send({
      status: 'success',
      data,
      message,
    });
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    const data = await this.tagService.updateOne(id, {
      ...updateTagDto,
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
  @Delete(':id')
  async delete(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    const data = await this.tagService.deleteOne(id);
    let message = 'success';
    let status = '';

    if (data.affected === 1) {
      message = 'Delete success';
    } else {
      message = 'Delete fail';
      status = 'error';
    }
    res.send({ status, message });
  }

  @Post('many')
  async getTagsByIds(@Res() res: Response, @Body() ids: string[]) {
    if (!ids) {
      res.send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'ids must be in array string',
      });
    } else {
      const categories = await this.tagService.getTagsByIds(ids);
      if (categories) {
        res.send(categories);
      } else {
        res.send({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'tags not found.',
        });
      }
    }
  }
}
