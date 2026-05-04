import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Factura } from '../ventas/entities/factura.entity';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepo: Repository<Factura>,
  ) {}

  create(createFacturaDto: CreateFacturaDto) {
    const { id_cliente, fecha } = createFacturaDto;
    const factura = this.facturaRepo.create({
      fecha: new Date(fecha),
      cliente: { id_cliente },
    });
    return this.facturaRepo.save(factura);
  }

  findAll() {
    return this.facturaRepo.find({ relations: ['cliente', 'ventas'] });
  }

  async findOne(id: number) {
    const factura = await this.facturaRepo.findOne({ 
      where: { id_factura: id },
      relations: ['cliente', 'ventas'] 
    });
    if (!factura) throw new NotFoundException(`Factura #${id} no encontrada`);
    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    await this.findOne(id);
    const { id_cliente, fecha } = updateFacturaDto;
    
    const updateData: any = {};
    if (fecha) updateData.fecha = new Date(fecha);
    if (id_cliente) updateData.cliente = { id_cliente };

    await this.facturaRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const factura = await this.findOne(id);
    return this.facturaRepo.remove(factura);
  }
}