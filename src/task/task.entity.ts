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

  @Column({ type: 'time' })
  added: Date;

  @Column()
  type: string;

  @Column({ type: 'time' })
  plannedStart: Date;

  @Column({ type: 'time' })
  plannedEnd: Date;

  @Column({ type: 'time', nullable: true })
  startedTime: Date;

  @Column({ type: 'time', nullable: true })
  endedTime: Date;

  @Column({ default: false })
  started: boolean;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
