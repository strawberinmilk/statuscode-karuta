import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { User } from '../user/user.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  @IsInt()
  readonly id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  @IsInt()
  userId: number;

  @Column({ default: 'Guest' })
  @IsString()
  userName: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  score: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  gameMode: string;

  @Column()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
