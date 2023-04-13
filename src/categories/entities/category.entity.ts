import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
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

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
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

  @Column()
  updateAt: Date;
}
