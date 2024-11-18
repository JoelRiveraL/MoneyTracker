import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('nota')  // Aseguramos que la entidad esté vinculada a la tabla 'nota'
export class Nota {
  @PrimaryGeneratedColumn({ name: 'idNota' })
  id: number;

  @Column({ name: 'idUsuario', nullable: true })
  idUsuario: number;

  @Column({ name: 'tituloN', type: 'varchar', length: 100 })
  titulo: string;

  @Column({ name: 'descripcionN', type: 'varchar', length: 300, nullable: true })
  descripcion: string;

  @Column({ name: 'fechaN', type: 'date' })
  fecha: string;  // Usamos string porque TypeORM maneja 'date' como tipo string

  @Column({ name: 'estadoN', type: 'varchar', length: 100 })
  estado: string;
}
