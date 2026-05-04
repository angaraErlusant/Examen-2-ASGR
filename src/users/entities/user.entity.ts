import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  USER = 'USER',
  DEVELOPER = 'DEVELOPER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}