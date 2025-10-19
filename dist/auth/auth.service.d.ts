import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from './../database/database.service';
export declare class AuthService {
    private databaseService;
    private jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    signIn(matricula: string, senha: string): Promise<any>;
}
