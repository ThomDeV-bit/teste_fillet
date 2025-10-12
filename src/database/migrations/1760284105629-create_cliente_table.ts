import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClienteTable1760284105629 implements MigrationInterface {
    name = 'CreateClienteTable1760284105629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nomeCompleto\` varchar(60) NOT NULL, \`dataNascimento\` date NOT NULL, \`cpf\` varchar(14) NOT NULL, \`cep\` varchar(10) NOT NULL, \`bairro\` varchar(50) NOT NULL, \`cidade\` varchar(50) NOT NULL, \`estado\` varchar(50) NOT NULL, UNIQUE INDEX \`IDX_980ea33e938c719bbababe4352\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`query-result-cache\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(255) NULL, \`time\` bigint NOT NULL, \`duration\` int NOT NULL, \`query\` text NOT NULL, \`result\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`query-result-cache\``);
        await queryRunner.query(`DROP INDEX \`IDX_980ea33e938c719bbababe4352\` ON \`cliente\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
    }

}
