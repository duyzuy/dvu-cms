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
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getAll(@Res() res: Response) {
    const allUser = await this.usersService.getAllUsers();

    res.send({
      statusCode: 1,
      message: 'Get all users success',
      data: allUser,
    });
  }

  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser({ ...createUserDto });
      res.send({
        statusCode: 200,
        message: 'create user success',
        data: newUser,
      });
    } catch (error) {
      console.log({ error });
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(error);
    }
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id, @Res() res: Response) {
    const userData = await this.usersService.getUserById(id);
    if (!userData) {
      res.status(400).send({
        message: 'User not found.',
      });
    }
    res.send({
      data: userData,
      message: 'Get data success.',
    });
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.updateUserById(id, {
      ...updateUserDto,
    });
    res.send({
      data: user,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {}
}
