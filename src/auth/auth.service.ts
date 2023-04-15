import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
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
    const user = await this.userService.findOne(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.signToken({
      email: user.email,
      userId: user.id,
    });
    return accessToken;
  }

  async signUp({ email, password, firstName, lastName, userName }: SignUpDto) {
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.userService.createUser({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: passwordHash,
      userName: userName,
      role: UserRole.SUPERADMIN,
    });

    return newUser;
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
