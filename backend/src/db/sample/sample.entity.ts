import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsInt, IsString } from 'class-validator';

@Entity()
export class Sample {
  @PrimaryGeneratedColumn()
  @IsInt()
  readonly id: number;

  @Column()
  @IsString()
  text: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
