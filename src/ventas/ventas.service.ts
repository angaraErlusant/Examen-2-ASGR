import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './entities/venta.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepo: Repository<Venta>,
  ) {}

  create(createVentaDto: CreateVentaDto) {
    const { id_factura, id_producto, cantidad } = createVentaDto;
    const venta = this.ventaRepo.create({
      cantidad,
      factura: { id_factura },
      producto: { id_producto },
    });
    return this.ventaRepo.save(venta);
  }

  findAll() {
    return this.ventaRepo.find({ relations: ['factura', 'producto'] });
  }

  async findOne(id: number) {
    const venta = await this.ventaRepo.findOne({ 
      where: { id_venta: id },
      relations: ['factura', 'producto'] 
    });
    if (!venta) throw new NotFoundException(`Venta #${id} no encontrada`);
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    await this.findOne(id);
    const { id_factura, id_producto, cantidad } = updateVentaDto;
    
    const updateData: any = {};
    if (cantidad) updateData.cantidad = cantidad;
    if (id_factura) updateData.factura = { id_factura };
    if (id_producto) updateData.producto = { id_producto };

    await this.ventaRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const venta = await this.findOne(id);
    return this.ventaRepo.remove(venta);
  }
}