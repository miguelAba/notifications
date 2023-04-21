import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ServiceController } from './v1/service/service.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DB_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'db',
          protoPath: join(__dirname, 'clients/db/v1/index.proto'),
          url: '0.0.0.0:5001',
        },
      },
    ]),
  ],
  controllers: [ServiceController],
  providers: [],
})
export class AppModule {}
