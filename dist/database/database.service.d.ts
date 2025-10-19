import { Repository } from 'typeorm';
import { Usuario } from './models/usuario';
import { Perfil } from './models/perfil';
export declare class DatabaseService {
    private usuariosRepository;
    private perfisRepository;
    constructor(usuariosRepository: Repository<Usuario>, perfisRepository: Repository<Perfil>);
    buscarPorMatricula(matricula: string): Promise<Usuario>;
}
