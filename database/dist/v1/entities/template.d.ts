import { Notification } from './notification';
export declare class Template {
    id: number;
    name: string;
    content: string;
    kind: string;
    createdDate: Date;
    updatedDate: Date;
    notifications: Notification[];
}
