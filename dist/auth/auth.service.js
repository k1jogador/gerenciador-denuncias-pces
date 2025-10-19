"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const database_service_1 = require("./../database/database.service");
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    databaseService;
    jwtService;
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async signIn(matricula, senha) {
        const user = await this.databaseService.buscarPorMatricula(matricula);
        if (user.senha_hash !== senha) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const result = {
            sub: user.id,
            nome: user.nome,
            email: user.email,
            matricula: user.matricula,
            id_perfil: user.id_perfil,
        };
        return {
            access_token: await this.jwtService.signAsync(result),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map