import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Unique } from 'src/utils/UniqueValidation';
import { User } from '../entities/user.entity';
import { UserRole } from '../interfaces/user.interface';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Unique(User)
  email: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'userName minimun 10 charater',
  })
  userName: string;

  @IsNotEmpty()
  @MinLength(2, {
    message: 'firstName minimun 3 charater',
  })
  firstName: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'lastName minimun 10 charater',
  })
  lastName: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  role: UserRole;
}
