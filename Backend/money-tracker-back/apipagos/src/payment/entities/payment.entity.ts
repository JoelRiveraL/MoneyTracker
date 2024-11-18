import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pago')
export class PaymentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  idPago: number;

  @Column({ type: 'int', nullable: true })
  idUsuario: number | null;

  @Column({ type: 'int', nullable: true })
  idReporte: number | null;

  @Column({ type: 'date', nullable: true })
  fechaLimiteP: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  descripcionP: string | null;

  @Column({ type: 'varchar', length: 100 })
  nombreP: string;

  @Column({ type: 'float' })
  montoP: number;

  @Column({ type: 'varchar', length: 100 })
  estadoP: string;

  @Column({ type: 'varchar', length: 100 })
  tipoP: string;
}
