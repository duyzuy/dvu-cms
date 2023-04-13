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
}
