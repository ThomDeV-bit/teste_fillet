import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './controller/clientes.controller';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
