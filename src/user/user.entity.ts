import { Exclude } from 'class-transformer';
import { TaskEntity } from 'src/task/task.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  refresh_token: string;

  @Column({ default: '' })
  firstname: string;

  @Column({ default: '' })
  lastname: string;

  @Column({ default: '' })
  patronymic: string;

  @Column({ default: '' })
  question: string;

  @Column({ default: '' })
  @Exclude()
  answer: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
