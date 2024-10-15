import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: 'sqlite.db',
  synchronize: false,
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
