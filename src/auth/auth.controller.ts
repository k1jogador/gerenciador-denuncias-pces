import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { SignIn } from './signIn';
import type { signUp } from './signUp'; 
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signIn: SignIn) {
    return this.authService.signIn(signIn.matricula, signIn.senha);
  }

  @HttpCode(HttpStatus.CREATED) 
  @Post('signup') 
  async signUp(@Body() signUp: signUp) {
    return this.authService.signUp(
      signUp.nome,
      signUp.email,
      signUp.matricula,
      signUp.senha,
      signUp.dataNascimento,
    );
  }
}