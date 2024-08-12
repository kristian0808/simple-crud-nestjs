import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEmployeeTable1723209696886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "employee",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "experience",
                    type: "int",
                },
                {
                    name: "department",
                    type: "varchar",
                },
                {
                    name: "startDate",
                    type: "date",
                },
                {
                    name: "civilStatus",
                    type: "enum",
                    enum: ["single", "married", "divorced"],
                    default: "'single'"
                },
                {
                    name: "userId",
                    type: "int",
                    isUnique: true
                }
            ]
        }), true);

            await queryRunner.createForeignKey("employee", new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE"
            }));
        }

        

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("employee");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("employee", foreignKey);
        await queryRunner.dropTable("employee");
    }

}
