import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { userActive } from './user.dto';
import { Score } from '../score/score.entity';

@Unique(['email', 'tmpEmail', 'name'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Score, (score) => score.userId)
  @IsInt()
  readonly id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Column({ nullable: true })
  @IsString()
  @IsNotEmpty()
  tmpEmail: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ nullable: true })
  @IsString()
  @IsNotEmpty()
  tmpToken: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  name: string;

  @Column({ default: userActive.TEMPORARY })
  @IsInt()
  @IsNotEmpty()
  active: number;

  @Column({ default: 1 })
  @IsInt()
  @IsNotEmpty()
  role: number;
}
