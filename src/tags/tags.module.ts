import { Module } from '@nestjs/common';
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './services/tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { PostsModule } from 'src/posts/posts.module';
@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
