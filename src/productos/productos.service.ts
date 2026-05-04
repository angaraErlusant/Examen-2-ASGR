import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from '../ventas/entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  create(createProductoDto: CreateProductoDto) {
    const { id_categoria, id_proveedor, ...rest } = createProductoDto;
    const producto = this.productoRepo.create({
      ...rest,
      categoria: { id_categoria },
      proveedor: { id_proveedor },
    });
    return this.productoRepo.save(producto);
  }

  findAll() {
    return this.productoRepo.find({ relations: ['categoria', 'proveedor'] });
  }

  async findOne(id: number) {
    const producto = await this.productoRepo.findOne({ 
      where: { id_producto: id },
      relations: ['categoria', 'proveedor'] 
    });
    if (!producto) throw new NotFoundException(`Producto #${id} no encontrado`);
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    await this.findOne(id);
    const { id_categoria, id_proveedor, ...rest } = updateProductoDto;
    
    const updateData: any = { ...rest };
    if (id_categoria) updateData.categoria = { id_categoria };
    if (id_proveedor) updateData.proveedor = { id_proveedor };

    await this.productoRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productoRepo.remove(producto);
  }
}