import { Column } from 'typeorm';

export class LogEntity {
  @Column({ type: 'varchar', length: 300 })
  created_by: string;

  @Column({ type: 'varchar', length: 300 })
  last_changed_by: string;

  @Column({ type: 'varchar', length: 300, default: null, nullable: true })
  deleted_by: string;
}
