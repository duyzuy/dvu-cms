import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => TagsModule),
    forwardRef(() => UsersModule),
  ],
})
export class PostsModule {}
