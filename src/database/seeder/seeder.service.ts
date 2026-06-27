import { Injectable } from '@nestjs/common';
import { LogEntity } from 'src/common/model/log.entity';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { Person } from 'src/modules/person/entities/person.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { UserRole } from 'src/modules/user-role/entities/user-role.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly authService: AuthService,
  ) {}

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const personRepository = queryRunner.manager.getRepository(Person);
      const persons = await personRepository.find();
      if (persons.length === 0) {
        const person = new Person();
        person.identity_card = '6047054';
        person.name = 'Leandro David';
        person.father_last_name = 'Torrez';
        person.mother_last_name = 'Salinas';
        person.birth_date = new Date();
        // person.image_path = 'admin.jpg';
        person.log = new LogEntity();
        person.log.created_by = 'SeederService';
        person.log.last_changed_by = 'SeederService';

        await personRepository.save(person);
      }

      const roleRepository = queryRunner.manager.getRepository(Role);
      const roles = await roleRepository.find();
      if (roles.length === 0) {
        const role = new Role();
        role.name = 'admin';
        role.log = new LogEntity();
        role.log.created_by = 'SeederService';
        role.log.last_changed_by = 'SeederService';
        await roleRepository.save(role);
      }

      const person = await personRepository.findOneBy({
        identity_card: '6047054',
      });

      const userRepository = queryRunner.manager.getRepository(User);
      const users = await userRepository.find();
      if (users.length === 0) {
        const user = new User();
        user.username = '6047054';
        user.person_id = person!.id;
        user.password = await this.authService.hashPassword('admin');
        user.log = new LogEntity();
        user.log.created_by = 'SeederService';
        user.log.last_changed_by = 'SeederService';
        const new_user = await userRepository.save(user);

        const role = await roleRepository.findOneBy({ name: 'admin' });
        if (role) {
          const userRoleRepository =
            queryRunner.manager.getRepository(UserRole);
          const user_role = await userRoleRepository.findOneBy({
            user_id: new_user.id,
            role_id: role.id,
          });

          if (!user_role) {
            const new_user_role = new UserRole();
            new_user_role.user_id = new_user.id;
            new_user_role.role_id = role.id;
            new_user_role.log = new LogEntity();
            new_user_role.log.created_by = 'SeederService';
            new_user_role.log.last_changed_by = 'SeederService';
            await userRoleRepository.save(new_user_role);
          }
        }
      } else {
        console.log('Users already seeded');
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
