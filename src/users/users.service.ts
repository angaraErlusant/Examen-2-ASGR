import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminExists = await this.userRepository.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = this.userRepository.create({
        nombre: 'Administrador',
        username: 'admin',
        password: hashedPassword,
        role: Role.ADMIN,
      });
      await this.userRepository.save(admin);
    }
  }

  async findAll() {
    return this.userRepository.find({ select: ['id', 'nombre', 'username', 'role'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, select: ['id', 'nombre', 'username', 'role'] });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(userData: Partial<User>) {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateData: Partial<User>) {
    await this.findOne(id);
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async updateRole(id: number, role: Role) {
    await this.findOne(id);
    await this.userRepository.update(id, { role });
    return this.findOne(id);
  }
}