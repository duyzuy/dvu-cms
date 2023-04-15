import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const userData = await this.authService.signIn({
      email: signInDto.email,
      password: signInDto.password,
    });
    res.send({ data: userData });
  }
  @Public()
  @Post('signup')
  async signUp(@Res() res: Response, @Body() signUpDto: SignUpDto) {
    const userData = await this.authService.signUp({
      ...signUpDto,
    });
    res.send({ data: userData });
  }
}
