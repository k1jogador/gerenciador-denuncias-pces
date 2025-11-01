import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'perfil' })
export class Perfil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  nome: string;
}
