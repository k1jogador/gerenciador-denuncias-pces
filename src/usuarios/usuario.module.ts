import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { Perfil } from '../perfis/perfil.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Perfil])],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
