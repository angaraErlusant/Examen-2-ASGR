import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProveedorDto {
  @ApiProperty({ example: 'Tech Solutions SA' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Av. Siempre Viva 123' })
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty({ example: '555-1234' })
  @IsString()
  @IsNotEmpty()
  telefono: string;
}