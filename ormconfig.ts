[
  {
    name: 'default',
    type: 'postgres',
    host: '',
    port: 5432,
    username: '',
    password: '',
    database: '',
    entities: ['dist/**/*.entity{ .ts,.js}'],
    synchronize: true,
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_history',
    migrationsRun: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
];
