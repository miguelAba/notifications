/* eslint-disable */

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
  CreateNotification(request: NotificationRequest): Promise<SubsResponse>;
  Hello(request: SubsResponse): Promise<SubsResponse>;
}
