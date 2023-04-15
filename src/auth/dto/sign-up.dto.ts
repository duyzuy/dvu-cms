import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Unique } from 'src/utils/UniqueValidation';
export class SignUpDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Unique(User)
  userName: string;

  @IsNotEmpty()
  password: string;
}
