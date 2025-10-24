import { Perfil } from './perfil';
export declare class Usuario {
    id: number | BigInt;
    nome: string;
    email: string;
    matricula: string;
    senha_hash: string;
    id_perfil: number;
    perfil: Perfil;
}
