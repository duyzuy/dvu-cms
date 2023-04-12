import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(6, {
    message: 'userName minimun 10 charater',
  })
  userName: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'firstName minimun 10 charater',
  })
  firstName: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'lastName minimun 10 charater',
  })
  lastName: string;
}
