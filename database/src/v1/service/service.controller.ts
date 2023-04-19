import { Controller } from '@nestjs/common';
import { NotificationRequest } from '../proto';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Template, Subscriptor, Notification } from '../entities';

@Controller()
export class ServiceController {
  constructor(
    @InjectRepository(Subscriptor) private sub: Repository<Subscriptor>,
    @InjectRepository(Notification) private not: Repository<Notification>,
    @InjectRepository(Template) private tem: Repository<Template>,
  ) {
    console.log('ServiceController');
  }

  private async getSuscriptor(ids: number[], kind: string) {
    const list = await this.sub.find({ where: { userId: In(ids), kind } });
    return list.map(({ endPoint, id }) => ({ endPoint, id }));
  }

  private async addTemplate(kind: string, name: string, content: string) {
    const template = this.tem.create({ kind, name, content });
    await this.tem.save(template);
    return template;
  }

  @GrpcMethod('DatabaseService')
  async CreateNotification({ ids, kind, content, name }: NotificationRequest) {
    //validate suscriptores
    console.log(ids, kind, content, name);
    const subs = await this.getSuscriptor(ids, kind);

    if (subs.length !== ids.length)
      return {
        state: `ERROR ${subs.length} ${ids.length} ${JSON.stringify(subs)}`,
      };

    const template = await this.addTemplate(kind, name, content);

    const insert = subs.map((subscriptor) =>
      this.not.insert({ subscriptor, template }),
    );
    await Promise.all(insert);

    return { state: 'OK' };
  }

  @GrpcMethod('DatabaseService')
  async Hello({ state }: { state: string }) {
    console.log('Hello');
    return { state };
  }
}
