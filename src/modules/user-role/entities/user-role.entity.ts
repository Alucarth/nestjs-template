import { LogEntity } from 'src/common/model/log.entity';
import { TimestampEntity } from 'src/common/model/timestamp.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id' })
  user_id!: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @Column({ name: 'role_id' })
  role_id!: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role!: Role;

  @Column(() => LogEntity, { prefix: false })
  log!: LogEntity;

  @Column(() => TimestampEntity, { prefix: false })
  timestamp!: TimestampEntity;
}
