import { MigrationInterface, QueryRunner } from 'typeorm';

export class <%= entityName %><%= migrationTime %> implements MigrationInterface {

  public async up(queryRunner: QueryRunner) {
    await queryRunner.query(`
      create table <%= entityNameLower %> (
        id serial primary key,
        email varchar not null,
        "firstName" varchar not null,
        "lastName" varchar not null,
        "isDraft" boolean not null,
        status varchar not null,
        "creationTime" timestamptz not null,
        "updateTime" timestamptz not null
      )
    `);
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.query('drop table <%= entityNameLower %>');
  }

}
