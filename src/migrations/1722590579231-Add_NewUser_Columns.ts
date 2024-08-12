import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewUserColumns1722590579231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE "user" 
            ADD COLUMN "address" VARCHAR(255),
            ADD COLUMN "state" VARCHAR(100),
            ADD COLUMN "city" VARCHAR(100),
            ADD COLUMN "street" VARCHAR(255)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE "user" 
            DROP COLUMN "address",
            DROP COLUMN "state",
            DROP COLUMN "city",
            DROP COLUMN "street"
        `);
    }

}
