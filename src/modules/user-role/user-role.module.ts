import { Module } from '@nestjs/common';
import { UserRoleController } from './controllers/user-role.controller';
import { UserRoleService } from './services/user-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole, User])],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
