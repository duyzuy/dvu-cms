import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

// @Module({
//   controllers: [AppController, UsersController],
//   providers: [AppService, UsersService],
// })

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'dvucms',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
