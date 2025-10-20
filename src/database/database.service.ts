import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "./models/usuario";
import { Perfil } from "./models/perfil";

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Perfil)
    private perfisRepository: Repository<Perfil>
  ) {}

  public async buscarUsuarioPorMatricula(matricula: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({
      where: { matricula: matricula },
    });

    if (!usuario) {
      throw new NotFoundException("Registro não encontrado");
    }
    return usuario;
  }
}
