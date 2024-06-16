import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRole1718510635164 implements MigrationInterface {
    name = 'AddUserRole1718510635164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

}
