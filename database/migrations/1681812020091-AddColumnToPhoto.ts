import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnToPhoto1681812020091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE photo ADD COLUMN test varchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE photo ADD COLUMN test varchar(255)`);
  }
}
