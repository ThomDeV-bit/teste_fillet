import { ClienteEntity } from '../clientes/entities/cliente.entity';
import { DataSourceOptions, DataSource } from 'typeorm';
import 'dotenv/config';
import { CreateClienteTable1760284105629 } from './migrations/1760284105629-create_cliente_table';

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_LOCAL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    cache: true,
    entities: [ClienteEntity],
    migrations: [CreateClienteTable1760284105629],
    synchronize: true,
    logging: 'all',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
