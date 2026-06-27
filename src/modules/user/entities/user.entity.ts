import { LogEntity } from 'src/common/model/log.entity';
import { TimestampEntity } from 'src/common/model/timestamp.entity';
import { Person } from 'src/modules/person/entities/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ name: 'person_id' })
  person_id!: number;

  @ManyToOne(() => Person, (person) => person.id)
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person!: Person;

  @Column(() => LogEntity, { prefix: false })
  log!: LogEntity;

  @Column(() => TimestampEntity, { prefix: false })
  timestamp!: TimestampEntity;
}
