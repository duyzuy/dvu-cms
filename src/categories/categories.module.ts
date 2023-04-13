import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoriesModule {}
