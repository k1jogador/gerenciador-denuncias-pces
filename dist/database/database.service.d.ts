import { Repository } from 'typeorm';
import { Usuario } from './models/usuario';
import { Perfil } from './models/perfil';
export declare class DatabaseService {
    private usuariosRepository;
    private perfisRepository;
    constructor(usuariosRepository: Repository<Usuario>, perfisRepository: Repository<Perfil>);
    buscarUsuarioPorMatricula(matricula: string): Promise<Usuario | null>;
    buscarUsuarioPorEmail(email: string): Promise<Usuario | null>;
    criarUsuario(usuarioData: Partial<Usuario>): Promise<Usuario>;
}
