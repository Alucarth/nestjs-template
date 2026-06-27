import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // IMPORTANTE
      inject: [ConfigService], // IMPORTANTE
      useFactory: databaseConfig,
    }),
    SeederModule,
  ],
})
export class DatabaseModule {}
