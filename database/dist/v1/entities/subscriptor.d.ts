import { Notification } from './notification';
export declare class Subscriptor {
    id: number;
    userId: number;
    kind: string;
    endPoint: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
    notifications: Notification[];
}
