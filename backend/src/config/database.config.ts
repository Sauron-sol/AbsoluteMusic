import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: join(__dirname, '..', '..', 'data', 'absolute.sqlite'),
  entities: [join(__dirname, '..', 'entities', '*.entity{.ts,.js}')],
  synchronize: true, // À désactiver en production
  logging: true,
}; 