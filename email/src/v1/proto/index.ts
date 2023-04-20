/* eslint-disable */
import { Observable } from "rxjs";

export const protobufPackage = "email";

export interface EmailReq {
  id: number;
  name: string;
  content: string;
  kind: string;
}

export interface EmailRes {
  state: string;
}

export interface EmailService {
  SendEmail(request: EmailReq): Observable<EmailRes>;
}
