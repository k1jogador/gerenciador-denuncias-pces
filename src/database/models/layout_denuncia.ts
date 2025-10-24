import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'layout_denuncia' })
export class LayoutDenuncia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  canal: string;
}
