import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { TypeormModule } from './database/database.module';

@Module({
  imports: [ClientesModule , TypeormModule.register()],
  controllers: [AppController],
  providers: [AppService , ],
})
export class AppModule {}
