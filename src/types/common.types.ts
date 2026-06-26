export type Id = number | string;

export type Nullable<T> = T | null;

export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface PaginatedResponse<T> {
  data: T[];
  count?: number;
  error: { message: string } | null;
}