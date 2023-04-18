import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { CategoryStatus } from 'src/utils/types';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column({
    nullable: true,
    type: 'longtext',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: CategoryStatus,
    default: CategoryStatus.DEACTIVE,
  })
  status: CategoryStatus;

  @Column({
    nullable: true,
  })
  thumbnail: string;

  @ManyToMany((type) => Post, (post) => post.categories)
  @JoinTable({
    name: 'posts_categories',
    joinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
  })
  posts: Post[];

  @Column()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  updatedAt: Date;
}
