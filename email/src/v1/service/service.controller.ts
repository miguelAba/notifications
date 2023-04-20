import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { EmailReq, EmailRes } from '../proto';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { DatabaseService } from '../../clients/db/v1';

@Controller()
export class ServiceController implements OnModuleInit {
  private dbService: DatabaseService;
  constructor(@Inject('DB_PACKAGE') private db: ClientGrpc) {}

  onModuleInit() {
    this.dbService = this.db.getService<DatabaseService>('DatabaseService');
  }

  @GrpcMethod('EmailService')
  async SendEmail({ id }: EmailReq) {
    // send email

    return this.dbService.CreateNotification({
      ids: [id],
      kind: 'email',
      content: 'content',
      name: 'name',
    });
  }
}
