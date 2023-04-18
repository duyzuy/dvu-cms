import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnNameOfPhoto1681811788775
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE photo ADD COLUMN name varchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE photo DROP COLUMN name varchar(255)`);
  }
}
