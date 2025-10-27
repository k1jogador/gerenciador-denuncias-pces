import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from './../database/database.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async signIn(matricula: string, senha: string): Promise<any> {
    const user =
      await this.databaseService.buscarUsuarioPorMatricula(matricula);

    if (!user) {
      throw new UnauthorizedException('Não autorizado');
    }
    if (user.senha_hash !== senha) {
      throw new UnauthorizedException('Não autorizado ');
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

  // Sistema de Cadastro 
  async signUp(
    email: string, senha: string, nome: string, matricula: string,
  ): Promise<any>{

    // Verificar se todos os campos foram devidamente preenchidos 
    if (!email || !senha || !nome || !matricula) {
      throw new BadRequestException('Todos os campos são obrigatórios');
    }

    const emailExistente = await this.databaseService.buscarUsuarioPorEmail(email);

    // Verifica se já existe o email logado no banco de dados
    if (emailExistente) {
      throw new UnauthorizedException('Já existe uma conta linkada a este email');
    }

    // Checa se matrícula já existe 
    const matriculaExistente = await this.databaseService.buscarUsuarioPorMatricula(matricula);
    if (matriculaExistente) {
      throw new UnauthorizedException('Já existe uma conta linkada a esta matrícula');
    }

    // Hash da senha com bcrypt
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o novo usuário
    const newUser = await this.databaseService.criarUsuario({
      email,
      senha_hash: hashedPassword,
      nome,
      matricula,
    });

    // Gera o token JWT similar ao signIn
    const result = {
      sub: newUser.id,
      nome: newUser.nome,
      email: newUser.email,
      matricula: newUser.matricula,
      id_perfil: newUser.id_perfil,
    };

    return {
      access_token: await this.jwtService.signAsync(result),
    };
  }
}



