import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { userActive } from './user.dto';

@Unique(['email', 'tmpEmail', 'name'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
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
