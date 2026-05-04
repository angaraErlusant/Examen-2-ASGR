import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Proveedore } from './proveedore.entity';
import { Venta } from './venta.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @ManyToOne(() => Proveedore, (proveedor) => proveedor.productos)
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedore;

  @OneToMany(() => Venta, (venta) => venta.producto)
  ventas: Venta[];
}