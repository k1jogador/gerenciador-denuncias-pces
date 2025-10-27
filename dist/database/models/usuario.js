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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const perfil_1 = require("./perfil");
let Usuario = class Usuario {
    id;
    nome;
    email;
    matricula;
    senha_hash;
    id_perfil;
    data_nascimento;
    perfil;
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "matricula", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Usuario.prototype, "senha_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_perfil' }),
    __metadata("design:type", Number)
], Usuario.prototype, "id_perfil", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Usuario.prototype, "data_nascimento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => perfil_1.Perfil),
    (0, typeorm_1.JoinColumn)({ name: 'id_perfil', referencedColumnName: 'id' }),
    __metadata("design:type", perfil_1.Perfil)
], Usuario.prototype, "perfil", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuario' })
], Usuario);
//# sourceMappingURL=usuario.js.map