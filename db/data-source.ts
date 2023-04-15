import { DataSource, DataSourceOptions } from 'typeorm';

export const datasourceOption: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'dvucms',
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

export const datasource = new DataSource(datasourceOption);
