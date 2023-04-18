import {
  Injectable,
  forwardRef,
  Inject,
  ForbiddenException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { User } from './entities/user.entity';
import {
  CreateUserParams,
  UpdateUserParams,
  UserRole,
} from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { removeScriptTag } from 'src/helpers/regex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({
    firstName,
    lastName,
    email,
    userName,
    password,
    role,
  }: CreateUserDto) {
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);
    firstName = removeScriptTag(firstName);
    lastName = removeScriptTag(lastName);
    email = removeScriptTag(email);
    userName = removeScriptTag(userName);

    try {
      const newUser = this.usersRepository.create({
        email: email,
        lastName: lastName,
        firstName: firstName,
        password: passwordHash,
        userName: userName,
        role: role,
        token: '',
        isActive: false,
        createdAt: new Date(),
      });

      await this.usersRepository.save(newUser);
      delete newUser.password;

      return newUser;
    } catch (error) {
      if (error instanceof TypeORMError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }
  async findAll(query: {
    take?: number;
    page?: number;
    order?: 'ASC' | 'DESC';
  }) {
    const take = query.take || 10;
    const page = query.page || 1;
    const order = query.order || 'DESC';

    const skip = (page - 1) * take;

    const [data, count] = await this.usersRepository
      .createQueryBuilder()
      .orderBy('createdAt', order)
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return {
      data: data,
      total: count,
      perPage: take,
      currentPage: page,
      totalPage: Math.ceil(count / take),
    };
  }

  async findOne(id: ParseUUIDPipe): Promise<User | null> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    if (user) {
      delete user.password;
      return user;
    }
    return null;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder()
        .where('email = :email', { email })
        .getOne();

      if (user) {
        return user;
      }
    } catch (error) {
      throw new ForbiddenException('email not found');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const queryBuider = this.usersRepository.createQueryBuilder();
    const user = await queryBuider.where('id = :id', { id }).getOne();

    return this.usersRepository.save({ ...user, ...updateUserDto });
    // return queryBuider
    //   .update(User)
    //   .set({ ...updateUserDto })
    //   .where('id = :id', { id })
    //   .execute();
  }
  async remove(id: ParseUUIDPipe) {
    return `this action remove a #${id} of user`;
  }
  async isEmailExists(email: string): Promise<boolean> {
    return this.usersRepository
      .createQueryBuilder()
      .where('email = :id', { email })
      .getExists();
  }
}
