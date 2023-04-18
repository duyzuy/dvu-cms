import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstCreateDB1681808988674 implements MigrationInterface {
  name = 'FirstCreateDB1681808988674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, UNIQUE INDEX \`IDX_3413aed3ecde54f832c4f44f04\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(200) NOT NULL, \`userName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('superadmin', 'admin', 'editor', 'visitor', 'creator') NOT NULL DEFAULT 'visitor', \`isActive\` tinyint NOT NULL DEFAULT 1, \`token\` varchar(255) NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` longtext NULL, \`status\` enum ('active', 'deactive') NOT NULL DEFAULT 'deactive', \`thumbnail\` varchar(255) NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, UNIQUE INDEX \`IDX_cb73208f151aa71cdd78f662d7\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`thumbnail\` varchar(255) NULL, \`description\` longtext NULL, \`shortDescription\` text NULL, \`status\` enum ('publish', 'approved', 'pending', 'draft', 'unpublish') NOT NULL DEFAULT 'pending', \`postType\` enum ('post', 'page') NOT NULL DEFAULT 'post', \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_cd1bddce36edc3e766798eab37\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`photo\` (\`id\` varchar(36) NOT NULL, \`url\` varchar(255) NOT NULL, \`size\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`posts_tags\` (\`tagId\` varchar(36) NOT NULL, \`postId\` varchar(36) NOT NULL, INDEX \`IDX_46d37fa943bb7d233d5987877e\` (\`tagId\`), INDEX \`IDX_8001e7fb6ff37581be869693c0\` (\`postId\`), PRIMARY KEY (\`tagId\`, \`postId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`posts_categories\` (\`postId\` varchar(36) NOT NULL, \`categoryId\` varchar(36) NOT NULL, INDEX \`IDX_e631d81d13c3b2e0e286524369\` (\`postId\`), INDEX \`IDX_73f979ccddcdf8c7e1aa066329\` (\`categoryId\`), PRIMARY KEY (\`postId\`, \`categoryId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts_tags\` ADD CONSTRAINT \`FK_46d37fa943bb7d233d5987877ec\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts_tags\` ADD CONSTRAINT \`FK_8001e7fb6ff37581be869693c0c\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts_categories\` ADD CONSTRAINT \`FK_e631d81d13c3b2e0e286524369c\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts_categories\` ADD CONSTRAINT \`FK_73f979ccddcdf8c7e1aa066329d\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts_categories\` DROP FOREIGN KEY \`FK_73f979ccddcdf8c7e1aa066329d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts_categories\` DROP FOREIGN KEY \`FK_e631d81d13c3b2e0e286524369c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts_tags\` DROP FOREIGN KEY \`FK_8001e7fb6ff37581be869693c0c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts_tags\` DROP FOREIGN KEY \`FK_46d37fa943bb7d233d5987877ec\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_73f979ccddcdf8c7e1aa066329\` ON \`posts_categories\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e631d81d13c3b2e0e286524369\` ON \`posts_categories\``,
    );
    await queryRunner.query(`DROP TABLE \`posts_categories\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8001e7fb6ff37581be869693c0\` ON \`posts_tags\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_46d37fa943bb7d233d5987877e\` ON \`posts_tags\``,
    );
    await queryRunner.query(`DROP TABLE \`posts_tags\``);
    await queryRunner.query(`DROP TABLE \`photo\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_cb73208f151aa71cdd78f662d7\` ON \`category\``,
    );
    await queryRunner.query(`DROP TABLE \`category\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_cd1bddce36edc3e766798eab37\` ON \`post\``,
    );
    await queryRunner.query(`DROP TABLE \`post\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3413aed3ecde54f832c4f44f04\` ON \`tag\``,
    );
    await queryRunner.query(`DROP TABLE \`tag\``);
  }
}
