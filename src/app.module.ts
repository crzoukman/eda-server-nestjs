import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TaskModule } from './task/task.module';
import { TaskEntity } from './task/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'sqlite',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          database: configService.get('DB_NAME'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          entities: [UserEntity, TaskEntity],
          synchronize: true,
        };
      },
    }),
    UserModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
