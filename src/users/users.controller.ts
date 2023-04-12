import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Req,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Res,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAll(@Req() request: Request): string {
    return 'all users';
  }

  @Post()
  create(@Res() res: Response, @Req() req: Request) {
    // res.status(HttpStatus.CREATED).send();
    console.log({ req });
    res
      .status(HttpStatus.OK)
      .send({ statusCode: 1, message: 'create user success' });
  }

  @Get(':id')
  getDetail(@Param() params): string {
    console.log(params.id);
    return `This user Id is ${params.id}`;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    return `update user ${id} success`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
