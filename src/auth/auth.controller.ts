import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const userData = await this.authService.signIn({
      email: signInDto.email,
      password: signInDto.password,
    });

    res.send({ data: userData });
  }
}
