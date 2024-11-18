import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  nombreU: string;

  @Column()
  apellidoU: string;

  @Column({ unique: true }) // Correo único
  correoU: string;

  @Column()
  passwordU: string;

  @Column()
  biografiaU: string;

  @Column({ nullable: true })
  fotoU: number;
}
