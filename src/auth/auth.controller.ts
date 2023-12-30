import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { AuthenticateGuard } from './strategy/authenticated.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return { msg: 'login' };
  }

  @UseGuards(AuthenticateGuard)
  @Get('protected')
  async protected() {
    return 'hello world';
  }
}
