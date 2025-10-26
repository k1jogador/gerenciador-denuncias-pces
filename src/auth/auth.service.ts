import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from './../database/database.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    matricula: string,
    senha: string,
  ): Promise<{ access_token: string }> {
    const user =
      await this.databaseService.buscarUsuarioPorMatricula(matricula);

    if (!user) {
      throw new UnauthorizedException('Não autorizado');
    }
    if (user.senha_hash !== senha) {
      throw new UnauthorizedException('Não autorizado');
    }
    const payload = {
      sub: user.id,
      id_perfil: user.id_perfil,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
