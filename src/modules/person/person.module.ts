import { Module } from '@nestjs/common';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
