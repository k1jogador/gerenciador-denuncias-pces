import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './models/usuario';
import { Perfil } from './models/perfil';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Perfil)
    private perfisRepository: Repository<Perfil>,
  ) {}

  public async buscarUsuarioPorMatricula(
    matricula: string,
  ): Promise<Usuario | null> {
    const usuario = await this.usuariosRepository.findOne({
      where: { matricula: matricula },
    });

    return usuario;
  }

  public async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
    const emailUsuario = await this.usuariosRepository.findOne({
      where: {email: email}
    });

    return emailUsuario;
  }

  public async criarUsuario(usuarioData: Partial<Usuario>): Promise<Usuario> {
    const novoUsuario = this.usuariosRepository.create(usuarioData);
    return await this.usuariosRepository.save(novoUsuario);
  }  
}
