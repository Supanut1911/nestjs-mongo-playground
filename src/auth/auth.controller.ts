import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user); //TODO : reutrn JWT access token
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protected() {
    return 'hello world'; // TODO: require an Bearer token, validate token
  }
}
