import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Factura } from './factura.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura[];
}