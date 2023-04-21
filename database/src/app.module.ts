import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './v1/service/service.controller';
import { Subscriptor, Notification, Template } from './v1/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Subscriptor, Notification, Template]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      database: process.env.POSTGRES_DB,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [ServiceController],
  providers: [],
})
export class AppModule {}
