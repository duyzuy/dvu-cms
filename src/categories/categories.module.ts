import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { PostsModule } from 'src/posts/posts.module';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => PostsModule),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
