import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'timestamp' })
  added: Date;

  @Column({ type: 'timestamp' })
  plannedStart: Date;

  @Column({ type: 'timestamp' })
  plannedEnd: Date;

  @Column({ type: 'timestamp', nullable: true })
  startedTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endedTime: Date;

  @Column({ default: false })
  started: boolean;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
