import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from '../ventas/entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepo.create(createClienteDto);
    return this.clienteRepo.save(cliente);
  }

  findAll() {
    return this.clienteRepo.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepo.findOne({ where: { id_cliente: id } });
    if (!cliente) throw new NotFoundException(`Cliente #${id} no encontrado`);
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    await this.findOne(id);
    await this.clienteRepo.update(id, updateClienteDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    return this.clienteRepo.remove(cliente);
  }
}