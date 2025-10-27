import { ConfigService } from '@nestjs/config';
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


  // Sistema de login
  async signIn(matricula: string, senha: string): Promise<any> {
    const user =
      await this.databaseService.buscarUsuarioPorMatricula(matricula);

    // Adicionei para comparar senha com o hash da senha usando o bcrypt
    const isPasswordValid = await bcrypt.compare(senha, user ? user.senha_hash : ConfigService.get('HASH_DUMMY'));
    if (!isPasswordValid) {
      throw new UnauthorizedException('Não autorizado');
    }

    const result = {
      sub: user.id,
      id_perfil: user.id_perfil,
    };
    return {
      access_token: await this.jwtService.signAsync(result),
    };
  }

  // Sistema de Cadastro 
  async signUp(
    nome: string, email: string, matricula: string, senha: string, dataNascimento: number,
  ): Promise<any>{
    if (!nome || !email || !matricula|| !senha || !dataNascimento) {
      throw new BadRequestException('Todos os campos são obrigatórios');
    }

    // Chega se email já existe no banco de dados
    const emailExistente = await this.databaseService.buscarUsuarioPorEmail(email);
    if (emailExistente) {
      throw new UnauthorizedException('Já existe uma conta linkada a este email');
    }

    // Checa se matrícula já existe no banco de dados
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
      data_nascimento: dataNascimento,
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



