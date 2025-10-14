import { ClienteEntity } from 'src/clientes/entities/cliente.entity';
import { dataSourceOptions } from './database.provider';
import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from './repositories/clientes.repository';

@Module({})
export class TypeormModule {
    static register(): DynamicModule {
        const entitiesSchema = [ClienteEntity];
        const config = dataSourceOptions;
        return {
            module: TypeormModule,
            global: true,
            imports: [
                TypeOrmModule.forFeature(entitiesSchema),
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        return {
                            autoLoadEntities: true,
                            ...config,
                        };
                    },
                }),
            ],
            exports: [ClienteRepository],
            providers: [ClienteRepository],
        };
    }
}
