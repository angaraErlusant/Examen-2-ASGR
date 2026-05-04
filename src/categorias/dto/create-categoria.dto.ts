import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Electrónica' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}