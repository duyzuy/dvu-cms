import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { UserRole } from '../interfaces/user.interface';
import { Unique } from 'src/utils/UniqueValidation';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(6, {
    message: 'userName minimun 6 charater',
  })
  @Unique(User)
  userName: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'firstName minimun 3 charater',
  })
  firstName: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'lastName minimun 10 charater',
  })
  lastName: string;

  @IsOptional()
  role: UserRole;
}
