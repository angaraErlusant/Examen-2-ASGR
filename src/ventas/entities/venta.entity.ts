import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Factura } from './factura.entity';
import { Producto } from './producto.entity';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id_venta: number;

  @Column('int')
  cantidad: number;

  @ManyToOne(() => Factura, (factura) => factura.ventas)
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;

  @ManyToOne(() => Producto, (producto) => producto.ventas)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}