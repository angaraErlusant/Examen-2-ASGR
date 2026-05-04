import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Calle 10 #54' })
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty({ example: '4921234567' })
  @IsString()
  @IsNotEmpty()
  telefono: string;
}