import {MigrationInterface, QueryRunner} from "typeorm";
import { SqlReader } from 'node-sql-reader';

export class Users1633558992982 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const folder = __dirname;
        const path = folder + '/users.sql';
        let queries = SqlReader.readSqlFile(path);
        for (let query of queries) {
            await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}