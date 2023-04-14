import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    //    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInParams: { email: string; password: string }) {
    // const user = await this.userService.findOne(signInParams.email);
    // if (user?.password !== signInParams.password) {
    //   throw new UnauthorizedException();
    // }
    // const payload = { email: user.email, sub: user.id };
    // const accessToken = await this.jwtService.signAsync(payload);
    // return {
    //   accessToken,
    // };
  }

  async signUp() {}
}
