import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//modules
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { UniqueConstraint } from './utils/UniqueValidation';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard, RolesGuard } from './auth/guard';

import { PhotosModule } from './photos/photos.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'dvucms',
      synchronize: true,
      autoLoadEntities: true,
    }),

    UsersModule,
    PostsModule,
    CategoriesModule,
    TagsModule,
    PhotosModule,
  ],
  providers: [
    UniqueConstraint,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
