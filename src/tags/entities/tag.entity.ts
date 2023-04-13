import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  slug: string;

  @ManyToMany((type) => Post)
  @JoinTable({
    name: 'posts_tags',
    joinColumn: {
      name: 'tagId',
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
