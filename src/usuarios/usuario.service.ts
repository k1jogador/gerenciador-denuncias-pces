import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Perfil } from '../perfis/perfil.entity';

@Injectable()
export class UsuarioService {
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

  public async buscarPerfilPorId(id: number): Promise<string | null> {
    const perfil = await this.perfisRepository.findOne({
      where: { id: id },
    });

    return perfil?.nome || null;
  }

  public async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
    const emailUsuario = await this.usuariosRepository.findOne({
      where: { email: email },
    });

    return emailUsuario;
  }

  public async criarUsuario(usuarioData: Partial<Usuario>): Promise<Usuario> {
    const dataComDefault = {
      ...usuarioData,
      id_perfil: usuarioData.id_perfil || 1,
    };
    const novoUsuario = this.usuariosRepository.create(dataComDefault);
    return await this.usuariosRepository.save(novoUsuario);
  }
}
