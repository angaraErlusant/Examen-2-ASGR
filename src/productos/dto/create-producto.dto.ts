import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ example: 'Laptop HP' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: 15000.50 })
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id_categoria: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id_proveedor: number;
}