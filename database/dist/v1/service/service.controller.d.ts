import { NotificationRequest, DatabaseService } from '../proto';
import { Repository } from 'typeorm';
import { Template, Subscriptor, Notification } from '../entities';
export declare class ServiceController implements DatabaseService {
    private sub;
    private not;
    private tem;
    constructor(sub: Repository<Subscriptor>, not: Repository<Notification>, tem: Repository<Template>);
    private getSuscriptor;
    private addTemplate;
    CreateNotification({ ids, kind, content, name }: NotificationRequest): import("rxjs").Observable<{
        state: string;
    } | {
        state: string;
    }>;
    Hello({ state }: {
        state: string;
    }): Promise<{
        state: string;
    }>;
}
