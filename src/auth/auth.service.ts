import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "./../database/database.service";
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async signIn(matricula: string, senha: string): Promise<any> {
    const user = await this.databaseService.buscarUsuarioPorMatricula(
      matricula
    );

    if (user.senha_hash !== senha || user == null) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    const result = {
      sub: user.id,
      nome: user.nome,
      email: user.email,
      matricula: user.matricula,
      id_perfil: user.id_perfil,
    };
    return {
      access_token: await this.jwtService.signAsync(result),
    };
  }
}
