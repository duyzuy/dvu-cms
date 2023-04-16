import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserRole } from '../interfaces/user.interface';
import { Post } from 'src/posts/entities/post.entity';
import { Expose } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  userName: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VISITOR,
  })
  role: UserRole;

  @OneToMany((type) => Post, (post) => post.userId)
  posts: Post[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  token: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
