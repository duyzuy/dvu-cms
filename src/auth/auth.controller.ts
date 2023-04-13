import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signIn')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const userData = await this.authService.signIn({
      ...signInDto,
    });
    console.log({ userData });
  }
}
