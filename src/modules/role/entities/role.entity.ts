import { LogEntity } from 'src/common/model/log.entity';
import { TimestampEntity } from 'src/common/model/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column(() => LogEntity, { prefix: false })
  log!: LogEntity;

  @Column(() => TimestampEntity, { prefix: false })
  timestamp!: TimestampEntity;
}
