import { operations as Operations } from "./dockerSchema";

export type Actions = keyof Operations;
type O<T extends Actions> = Operations[T];
type Responses<T extends Actions> = O<T>["responses"];
type StatusCodes<T extends Actions> = keyof Responses<T>;

export type Data<T extends Actions> = {
  [K in StatusCodes<T>]: Responses<T>[K] extends {
    content: { "application/json": infer Content };
  }
    ? Content
    : {};
}[StatusCodes<T>];

// Limit success status codes for now
type SuccessResponseData<T extends Actions> = {
  [SC in StatusCodes<T> as SC extends 200 | 201 | 204
    ? SC
    : never]: Responses<T>[SC] extends {
    content: { "application/json": infer Content };
  }
    ? Content
    : {};
};

export type SuccessResponse<T extends Actions> =
  SuccessResponseData<T>[keyof SuccessResponseData<T>];

export type QueryParams<T extends Actions> = O<T> extends {
  parameters?: { query?: infer Q };
}
  ? Q
  : {};

export type RequestOptions<T extends Actions> = O<T> extends {
  requestBody?: { content?: { "application/json": infer R } };
}
  ? R
  : {};

export type Response = {
  [K in Actions]: SuccessResponse<K>;
};

export type DaemonResponse<T extends Actions> = Promise<
  SuccessResponse<T> extends string | number
    ? { data: string | number }
    : SuccessResponse<T>
>;
