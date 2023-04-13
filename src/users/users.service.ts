import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  CreateUserParams,
  UpdateUserParams,
  UserRoleType,
} from './interfaces/user.interface';
import { DataSource } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}
  async getAllUsers(): Promise<User[]> {
    // console.log(
    //   await this.dataSource.manager.findOneByOrFail(User, {
    //     email: 'nguyenvana@gmail.com',
    //   }),
    // );
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
      createAt: new Date(),
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
}
