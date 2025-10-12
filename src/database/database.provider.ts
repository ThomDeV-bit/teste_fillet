import { ClienteEntity } from "../clientes/entities/cliente.entity";
import { DataSourceOptions, DataSource } from "typeorm";
import 'dotenv/config';
import { CreateClienteTable1760275343520 } from "./migrations/1760275343520-create_cliente_table";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_LOCAL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    cache: true,
    entities: [ClienteEntity],
    migrations: [CreateClienteTable1760275343520],
    synchronize: true,
    logging: 'all'
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
