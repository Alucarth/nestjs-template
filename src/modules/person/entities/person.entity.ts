import { LogEntity } from 'src/common/model/log.entity';
import { TimestampEntity } from 'src/common/model/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  identity_card!: string;

  @Column({ nullable: true })
  complement!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  father_last_name?: string;

  @Column({ nullable: true })
  mother_last_name?: string;

  @Column({ nullable: true })
  birth_date?: Date;

  @Column({ nullable: true })
  image_path?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column(() => LogEntity, { prefix: false })
  log!: LogEntity;

  @Column(() => TimestampEntity, { prefix: false })
  timestamp!: TimestampEntity;
}
