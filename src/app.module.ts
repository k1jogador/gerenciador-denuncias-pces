import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './database/models/usuario';
import { Perfil } from './database/models/perfil';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'shortline.proxy.rlwy.net',
      port: 59874,
      username: 'postgres',
      password: 'yhZrYSxAYlSLzJQZraIbZpPRamPBDNgH',
      database: 'railway',
      entities: [Usuario, Perfil],
      synchronize: true,
      logging: true,
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
