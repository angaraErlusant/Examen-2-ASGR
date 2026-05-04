import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Venta } from './venta.entity';

@Entity('facturas')
export class Factura {
  @PrimaryGeneratedColumn()
  id_factura: number;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.facturas)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @OneToMany(() => Venta, (venta) => venta.factura)
  ventas: Venta[];
}