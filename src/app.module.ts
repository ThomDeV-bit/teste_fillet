import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { TypeormModule } from './database/database.module';

@Module({
    imports: [ClientesModule, TypeormModule.register()],
    controllers: [],
    providers: [],
})
export class AppModule { }
