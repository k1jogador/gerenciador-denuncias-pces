import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { SignIn } from './dto/signIn';
import type { signUp } from './dto/signUp';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from './decorators/roles.decorator';

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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
