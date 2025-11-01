import { Perfil } from '../perfis/perfil.entity';
export declare class Usuario {
    id: number | bigint;
    nome: string;
    email: string;
    matricula: string;
    senha_hash: string;
    id_perfil: number;
    data_nascimento: number;
    perfil: Perfil;
}
