import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscriptor } from './subscriptor';
import { Template } from './template';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => Subscriptor, (subscriptor) => subscriptor.notifications)
  subscriptor: Subscriptor;

  @ManyToOne(() => Template, (template) => template.notifications)
  template: Template;
}
