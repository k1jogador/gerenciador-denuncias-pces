import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Perfil } from '../perfis/perfil.entity';
export declare class UsuarioService {
    private usuariosRepository;
    private perfisRepository;
    constructor(usuariosRepository: Repository<Usuario>, perfisRepository: Repository<Perfil>);
    buscarUsuarioPorMatricula(matricula: string): Promise<Usuario | null>;
    buscarPerfilPorId(id: number): Promise<string | null>;
    buscarUsuarioPorEmail(email: string): Promise<Usuario | null>;
    criarUsuario(usuarioData: Partial<Usuario>): Promise<Usuario>;
}
