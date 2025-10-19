import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Perfil } from './perfil';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number | BigInt;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 20, unique: true })
  matricula: string;

  @Column({ length: 255 })
  senha_hash: string;

  @Column({ name: 'id_perfil' })
  id_perfil: number;

  @ManyToOne(() => Perfil)
  @JoinColumn({ name: 'id_perfil', referencedColumnName: 'id' })
  perfil: Perfil;
}
