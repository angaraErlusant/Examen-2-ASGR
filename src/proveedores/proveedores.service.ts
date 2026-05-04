import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProveedorDto } from './dto/create-proveedore.dto';
import { UpdateProveedorDto } from './dto/update-proveedore.dto';
import { Proveedor } from '../ventas/entities/proveedor.entity';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,
  ) {}

  create(createProveedorDto: CreateProveedorDto) {
    const proveedor = this.proveedorRepo.create(createProveedorDto);
    return this.proveedorRepo.save(proveedor);
  }

  findAll() {
    return this.proveedorRepo.find();
  }

  async findOne(id: number) {
    const proveedor = await this.proveedorRepo.findOne({ where: { id_proveedor: id } });
    if (!proveedor) throw new NotFoundException(`Proveedor #${id} no encontrado`);
    return proveedor;
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto) {
    await this.findOne(id);
    await this.proveedorRepo.update(id, updateProveedorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const proveedor = await this.findOne(id);
    return this.proveedorRepo.remove(proveedor);
  }
}