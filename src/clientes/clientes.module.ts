import { Module } from '@nestjs/common';
import { ClienteController } from './controller/clientes.controller';
import { ClienteService } from './service/clientes.service';
import { CepService } from './service/cep.service';

@Module({
    imports: [],
    controllers: [ClienteController],
    providers: [ClienteService, CepService],
})
export class ClientesModule {}
