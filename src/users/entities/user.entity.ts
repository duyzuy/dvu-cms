import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleType } from '../interfaces/user.interface';

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

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['superadmin', 'admin', 'editor', 'visitor'],
    default: 'visitor',
  })
  role: UserRoleType;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  token: string;

  @Column()
  createAt: Date;

  @Column()
  updateAt: Date;
}
