import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { PostStatus, PostTypes } from 'src/utils/types';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({
    nullable: true,
  })
  thumbnail: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  shortDescription: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.PENDING,
  })
  status: PostStatus;

  @Column({
    type: 'enum',
    enum: PostTypes,
    default: PostTypes.POST,
  })
  postType: PostStatus;

  @ManyToMany((type) => Category, (category) => category.posts)
  @JoinTable({
    name: 'posts_categories',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany((type) => Tag)
  @JoinTable({
    name: 'posts_tags',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @Column()
  createdAt: Date;

  @Column()
  updateAt: Date;
}
