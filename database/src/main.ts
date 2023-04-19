import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'db',
        protoPath: join(__dirname, './v1/proto/index.proto'),
        url: 'localhost:8082',
      },
    },
  );

  await app.listen();
}
bootstrap();
