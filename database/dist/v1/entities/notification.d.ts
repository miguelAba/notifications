import { Subscriptor } from './subscriptor';
import { Template } from './template';
export declare class Notification {
    id: number;
    createdDate: Date;
    updatedDate: Date;
    subscriptor: Subscriptor;
    template: Template;
}
