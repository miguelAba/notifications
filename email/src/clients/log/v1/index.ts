/* eslint-disable */

export const protobufPackage = "log";

export interface LogReq {
  data: string;
}

export interface LogRes {
  state: number;
}

export interface LogService {
  Add(request: LogReq): Promise<LogRes>;
}
