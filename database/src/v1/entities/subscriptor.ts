import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Notification } from './notification';

@Entity({ name: 'subscriptors' })
export class Subscriptor {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'varchar', length: 255 })
  kind: string;

  @Column({ type: 'varchar', length: 255 })
  endPoint: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Notification, (notification) => notification.subscriptor)
  notifications: Notification[];
}
