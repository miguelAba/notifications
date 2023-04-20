/* eslint-disable */
import { Observable } from "rxjs";

export const protobufPackage = "db";

export interface SubsResponse {
  state: string;
}

export interface NotificationRequest {
  ids: number[];
  name: string;
  content: string;
  kind: string;
}

export interface DatabaseService {
  CreateNotification(request: NotificationRequest): Observable<SubsResponse>;
  Hello(request: SubsResponse): Promise<SubsResponse>;
}
