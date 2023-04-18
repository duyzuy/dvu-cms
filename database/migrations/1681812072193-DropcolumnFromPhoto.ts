import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropcolumnFromPhoto1681812072193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE photo DROP COLUMN test`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
