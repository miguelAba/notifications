import { Controller, Inject } from '@nestjs/common';
import { EmailReq, EmailRes } from '../proto';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { DatabaseService } from '../../clients/db/v1';

@Controller()
export class ServiceController {
  private dbService: DatabaseService;
  constructor(@Inject('DB_PACKAGE') private db: ClientGrpc) {}

  onModuleInit() {
    this.dbService = this.db.getService<DatabaseService>('DatabaseService');
  }

  @GrpcMethod('EmailService', 'SendEmail')
  async SendEmail({ id }: EmailReq): Promise<EmailRes> {
    // send email
    console.log(id);
    const { state } = await this.dbService.CreateNotification({
      ids: [id],
      kind: 'email',
      content: 'content',
      name: 'name',
    });

    return { state };
  }
}
