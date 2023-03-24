export enum RestMethods {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}

export enum LoadingStatuses {
  NOT_LOADED = "not loaded",
  LOADING = "loading",
  LOADED = "loaded",
  FAILED = "failed",
}

export interface APIResponse<T> {
  data: T;
  error?: any;
}

export type APIError<T = any> = { errors: string[] } & T;

export type APIErrorResponse<T = any> = {
  data?: never;
  error: APIError<T>;
};

export interface PaginationMeta {
  current: number;
  total: number;
  previous: number | null;
  next_page: number | null;
  last_page: number;
}
