import { IsDateString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFacturaDto {
  @ApiProperty({ example: '2026-05-04' })
  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id_cliente: number;
}