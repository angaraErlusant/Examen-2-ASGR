import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVentaDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsPositive()
  cantidad: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id_factura: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  id_producto: number;
}