import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRole } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto) {
    //Check user exists
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException('Email not exists.', 'error');
    }

    //Check password match if user exists
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('password or email is not correct');
    }

    const accessToken = await this.signToken({
      email: user.email,
      userId: user.id,
    });
    return accessToken;
  }

  async signUp({ email, password, firstName, lastName, userName }: SignUpDto) {
    const saltOrRounds = 10;
    try {
      const newUser = await this.userService.createUser({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        userName: userName,
        role: UserRole.SUPERADMIN,
      });

      return newUser;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'error',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async signToken({
    email,
    userId,
  }: {
    email: string;
    userId: string;
  }): Promise<{ accessToken: string }> {
    const token = await this.jwtService.signAsync({ email, userId });
    return {
      accessToken: token,
    };
  }
}
