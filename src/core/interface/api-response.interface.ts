import { HttpStatus } from "@nestjs/common";

export interface ApiResponse<T> {
  statusCode: number;
  status: string;
  message: string;
  data?: T;
  error?: string[];
}