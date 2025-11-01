"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const usuario_service_1 = require("../usuarios/usuario.service");
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    databaseService;
    jwtService;
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async signIn(matricula, senha) {
        const user = await this.databaseService.buscarUsuarioPorMatricula(matricula);
        const matchPass = await bcrypt.compare(senha, user
            ? user.senha_hash
            : '$2b$10$J8Ic/U6L4S2Bh0OeejhGyeCRX66oLuafG36UzTURFYuwZefJyPN0C');
        if (!matchPass || !user) {
            throw new common_1.UnauthorizedException();
        }
        const result = {
            sub: user.id,
            role: await this.databaseService.buscarPerfilPorId(user.id_perfil),
        };
        return {
            access_token: await this.jwtService.signAsync(result),
        };
    }
    async signUp(nome, email, matricula, senha, dataNascimento) {
        if (!nome || !email || !matricula || !senha || !dataNascimento) {
            throw new common_1.BadRequestException('Todos os campos são obrigatórios');
        }
        const emailExistente = await this.databaseService.buscarUsuarioPorEmail(email);
        if (emailExistente) {
            throw new common_1.UnauthorizedException('Já existe uma conta linkada a este email');
        }
        const matriculaExistente = await this.databaseService.buscarUsuarioPorMatricula(matricula);
        if (matriculaExistente) {
            throw new common_1.UnauthorizedException('Já existe uma conta linkada a esta matrícula');
        }
        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = await this.databaseService.criarUsuario({
            email,
            senha_hash: hashedPassword,
            nome,
            matricula,
            data_nascimento: dataNascimento,
        });
        const result = {
            sub: newUser.id,
            nome: newUser.nome,
            email: newUser.email,
            matricula: newUser.matricula,
            id_perfil: newUser.id_perfil,
        };
        return {
            access_token: await this.jwtService.signAsync(result),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map