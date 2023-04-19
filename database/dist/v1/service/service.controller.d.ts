import { NotificationRequest } from '../proto';
import { Repository } from 'typeorm';
import { Template, Subscriptor, Notification } from '../entities';
export declare class ServiceController {
    private sub;
    private not;
    private tem;
    constructor(sub: Repository<Subscriptor>, not: Repository<Notification>, tem: Repository<Template>);
    private getSuscriptor;
    private addTemplate;
    CreateNotification({ ids, kind, content, name }: NotificationRequest): Promise<{
        state: string;
    }>;
    Hello({ state }: {
        state: string;
    }): Promise<{
        state: string;
    }>;
}
