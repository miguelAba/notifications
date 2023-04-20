import { Controller } from '@nestjs/common';
import { NotificationRequest, DatabaseService } from '../proto';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Template, Subscriptor, Notification } from '../entities';
import { forkJoin, from, iif, map, mergeMap, of, zip } from 'rxjs';

@Controller()
export class ServiceController implements DatabaseService {
  constructor(
    @InjectRepository(Subscriptor) private sub: Repository<Subscriptor>,
    @InjectRepository(Notification) private not: Repository<Notification>,
    @InjectRepository(Template) private tem: Repository<Template>,
  ) {}

  private getSuscriptor(ids: number[], kind: string) {
    const subs = this.sub.find({ where: { userId: In(ids), kind } });
    return from(subs).pipe(
      map((list) => list.map(({ endPoint, id }) => ({ endPoint, id }))),
    );
  }

  private addTemplate(kind: string, name: string, content: string) {
    const template = this.tem.create({ kind, name, content });
    return from(this.tem.save(template));
  }

  @GrpcMethod('DatabaseService')
  CreateNotification({ ids, kind, content, name }: NotificationRequest) {
    return zip(
      this.getSuscriptor(ids, kind),
      this.addTemplate(kind, name, content),
    ).pipe(
      mergeMap(([subs, template]) =>
        iif(
          () => subs.length !== ids.length,
          of({ state: `ERROR` }),
          forkJoin(
            subs.map((subscriptor) =>
              of(this.not.insert({ subscriptor, template })),
            ),
          ).pipe(map(() => ({ state: 'OK' }))),
        ),
      ),
    );
  }

  @GrpcMethod('DatabaseService')
  async Hello({ state }: { state: string }) {
    console.log('Hello');
    return { state };
  }
}
