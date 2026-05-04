import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from '../ventas/entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.categoriaRepo.create(createCategoriaDto);
    return this.categoriaRepo.save(categoria);
  }

  findAll() {
    return this.categoriaRepo.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepo.findOne({ where: { id_categoria: id } });
    if (!categoria) throw new NotFoundException(`Categoría #${id} no encontrada`);
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.findOne(id);
    await this.categoriaRepo.update(id, updateCategoriaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    return this.categoriaRepo.remove(categoria);
  }
}