import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  CreateUserParams,
  UpdateUserParams,
  UserRoleType,
} from './interfaces/user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(userDetail: CreateUserParams) {
    const newUser = this.usersRepository.create({
      ...userDetail,
      role: UserRoleType.VISITOR,
      token: '',
      isActive: false,
      password: '123',
      createdAt: new Date(),
    });

    return this.usersRepository.save(newUser);
  }
  updateUserById(id: string, userDetail: UpdateUserParams) {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ ...userDetail })
      .where('id = :id', { id })
      .execute();
  }
  isEmailExists(email: string): Promise<boolean> {
    return this.usersRepository
      .createQueryBuilder()
      .where('email = :id', { email })
      .getExists();
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
  }
}
