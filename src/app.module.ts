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
import { UniqueWithParamsConstraint } from './utils/UpdateUniqueField';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOption } from 'database/data-source';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRoot(dataSourceOption),
    UsersModule,
    PostsModule,
    CategoriesModule,
    TagsModule,
    PhotosModule,
  ],
  providers: [
    UniqueConstraint,
    UniqueWithParamsConstraint,
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
export class AppModule {
  constructor(private configService: ConfigService) {}
}
