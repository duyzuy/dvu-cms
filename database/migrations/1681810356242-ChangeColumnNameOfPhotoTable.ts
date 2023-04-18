import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnNameOfPhotoTable1681810356242
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE photo MODIFY COLUMN title varchar(30)`);
    await queryRunner.query(`ALTER TABLE photo ADD COLUMN text vachar`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
