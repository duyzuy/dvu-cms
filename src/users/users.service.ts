import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  CreateUserParams,
  UpdateUserParams,
} from './interfaces/user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(userDetail: CreateUserParams) {
    const newUser = this.usersRepository.create({
      ...userDetail,
      role: 'admin',
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
    // return this.usersRepository.update({ id }, { ...userDetail });
  }
}
