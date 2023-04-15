import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [],
  providers: [],
})
export class PhotosModule {}
