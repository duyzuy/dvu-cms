import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//entities
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Category } from './categories/entities/category.entity';
import { Tag } from './tags/entities/tag.entity';
//modules
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { UniqueConstraint } from './utils/UniqueValidation';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'dvucms',
      entities: [User, Post, Category, Tag],
      synchronize: true, //shouldn't be used in production
      autoLoadEntities: true,
    }),
    UsersModule,
    PostsModule,
    CategoriesModule,
    TagsModule,
  ],
  providers: [UniqueConstraint],
})
export class AppModule {}
