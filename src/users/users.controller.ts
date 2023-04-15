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
  Query,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from './interfaces/user.interface';
//@UseGuards(JwtGuard) // used for global app module
@Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(@Res() res: Response, @Query() { page, perPage }) {
    const users = await this.usersService.getAllUsers({
      take: Number(perPage),
      page: Number(page),
    });

    res.send({
      data: {
        list: users.data,
        currentPage: users.currentPage,
        perPage: users.perPage,
        totalPage: users.totalPage,
        total: users.total,
      },
      status: 'success',
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

  @Get('/auth/profile')
  async getProfile(@Res() res: Response, @Req() req: Request) {
    console.log(req.user);

    res.send({ data: req.user });
  }
}
