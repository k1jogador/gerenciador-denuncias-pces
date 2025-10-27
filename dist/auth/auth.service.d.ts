import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from './../database/database.service';
export declare class AuthService {
    private databaseService;
    private jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    signIn(matricula: string, senha: string): Promise<any>;
    signUp(email: string, senha: string, nome: string, matricula: string, id_perfil: number): Promise<any>;
}
