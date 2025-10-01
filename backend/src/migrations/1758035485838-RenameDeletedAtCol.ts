import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameDeletedAtCol1758035485838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "genre" RENAME COLUMN "deleteAt" TO "deletedAt"`
        )
        await queryRunner.query(
            `ALTER TABLE "series" RENAME COLUMN "deleteAt" TO "deletedAt"`
        )
        await queryRunner.query(
            `ALTER TABLE "game_movie" RENAME COLUMN "deleteAt" TO "deletedAt"`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
        `ALTER TABLE "genre" RENAME COLUMN "deletedAt" TO "deleteAt"`
        )   
        await queryRunner.query(
            `ALTER TABLE "series" RENAME COLUMN "deletedAt" TO "deleteAt"`
        )
        await queryRunner.query(
            `ALTER TABLE "game_movie" RENAME COLUMN "deletedAt" TO "deleteAt"`
        )
    }

}
