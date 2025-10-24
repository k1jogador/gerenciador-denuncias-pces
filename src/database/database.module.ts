import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { Usuario } from './models/usuario';
import { Perfil } from './models/perfil';
@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Perfil])],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
