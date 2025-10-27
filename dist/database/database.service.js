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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_1 = require("./models/usuario");
const perfil_1 = require("./models/perfil");
let DatabaseService = class DatabaseService {
    usuariosRepository;
    perfisRepository;
    constructor(usuariosRepository, perfisRepository) {
        this.usuariosRepository = usuariosRepository;
        this.perfisRepository = perfisRepository;
    }
    async buscarUsuarioPorMatricula(matricula) {
        const usuario = await this.usuariosRepository.findOne({
            where: { matricula: matricula },
        });
        return usuario;
    }
    async buscarUsuarioPorEmail(email) {
        const emailUsuario = await this.usuariosRepository.findOne({
            where: { email: email }
        });
        return emailUsuario;
    }
    async criarUsuario(usuarioData) {
        const novoUsuario = this.usuariosRepository.create(usuarioData);
        return await this.usuariosRepository.save(novoUsuario);
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(perfil_1.Perfil)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DatabaseService);
//# sourceMappingURL=database.service.js.map