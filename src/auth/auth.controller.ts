import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { SignIn } from './signIn';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signIn: SignIn) {
    return this.authService.signIn(signIn.matricula, signIn.senha);
  }
}
