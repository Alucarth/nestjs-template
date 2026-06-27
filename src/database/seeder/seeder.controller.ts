import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private seederService: SeederService) {}

  @Post('seed')
  async seed() {
    return await this.seederService.seed();
  }
}
