import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class DeleteDeveloperPublisherColFromSeriesAndGameMovie1758096663869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Xóa cột developer & publisher khỏi game_movie
        await queryRunner.dropColumn("game_movie", "developer");
        await queryRunner.dropColumn("game_movie", "publisher");

        // Xóa cột developer & publisher khỏi series
        await queryRunner.dropColumn("series", "developer");
        await queryRunner.dropColumn("series", "publisher");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Phục hồi cột developer & publisher cho game_movie
        await queryRunner.addColumn("game_movie", new TableColumn({
            name: "developer",
            type: "varchar",
            isNullable: true,
        }));
        await queryRunner.addColumn("game_movie", new TableColumn({
            name: "publisher",
            type: "varchar",
            isNullable: true,
        }));

        // Phục hồi cột developer & publisher cho series
        await queryRunner.addColumn("series", new TableColumn({
            name: "developer",
            type: "varchar",
            isNullable: true,
        }));
        await queryRunner.addColumn("series", new TableColumn({
            name: "publisher",
            type: "varchar",
            isNullable: true,
        }));
    }

}
