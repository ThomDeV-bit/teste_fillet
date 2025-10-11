import { DataSourceOptions, DataSource } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_LOCAL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    cache: true,
    entities: [],
    migrations: [],
    synchronize: true,
    logging: 'all'
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
