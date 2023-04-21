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
        package: 'email',
        protoPath: join(__dirname, './v1/proto/index.proto'),
        url: '0.0.0.0:5002',
      },
    },
  );

  await app.listen();
}
bootstrap();
