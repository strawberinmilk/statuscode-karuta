import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  @IsInt()
  readonly id: number;

  // ユーザ機能実装するまではnullしか入らない
  @Column({ nullable: true })
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
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
