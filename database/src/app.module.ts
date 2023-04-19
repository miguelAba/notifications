import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './v1/service/service.controller';
import { Subscriptor, Notification, Template } from './v1/entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Subscriptor, Notification, Template]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [ServiceController],
  providers: [],
})
export class AppModule {}
