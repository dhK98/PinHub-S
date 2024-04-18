import { DataSource } from 'typeorm';

export interface Repository<Entity> {
  datasource: DataSource;
  connect(): void;
  disconnect(): void;
  findWithId(): Entity;
  findWithWhere(): Entity;
  findsWithWhere(): [Entity];
}
