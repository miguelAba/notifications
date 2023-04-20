import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './v1/service/service.controller';
import { Subscriptor, Notification, Template } from './v1/entities';

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Subscriptor, Notification, Template]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      port: parseInt(POSTGRES_PORT),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [ServiceController],
  providers: [],
})
export class AppModule {}
