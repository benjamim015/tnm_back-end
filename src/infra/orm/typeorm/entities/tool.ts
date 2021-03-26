import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tools')
export class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @Column('varchar', { array: true })
  tags: Array<string>;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
