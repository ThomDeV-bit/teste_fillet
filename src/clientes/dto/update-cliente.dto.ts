import { CreateClienteDto } from './create-cliente.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
