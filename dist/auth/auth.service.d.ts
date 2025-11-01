import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuarios/usuario.service';
export declare class AuthService {
    private databaseService;
    private jwtService;
    constructor(databaseService: UsuarioService, jwtService: JwtService);
    signIn(matricula: string, senha: string): Promise<any>;
    signUp(nome: string, email: string, matricula: string, senha: string, dataNascimento: number): Promise<any>;
}
