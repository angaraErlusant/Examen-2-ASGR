import { PartialType } from '@nestjs/swagger';
import { CreateProveedorDto } from './create-proveedore.dto';

export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {}