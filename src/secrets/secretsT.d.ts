import {
  SuccessResponse,
  Actions,
  QueryParams,
  RequestOptions,
} from "../../response";

type DaemonResponse<T extends Actions> = Promise<
  SuccessResponse<T> extends string | number
    ? { message: string | number }
    : SuccessResponse<T>
>;

type List = (
  options: QueryParams<"SecretList">
) => DaemonResponse<"SecretList">;

type Create = (
  data: RequestOptions<"SecretCreate">
) => DaemonResponse<"SecretCreate">;

type Inspect = (id: string) => DaemonResponse<"SecretInspect">;

type Delete = (id: string) => DaemonResponse<"SecretDelete">;

type Update = (
  id: string,
  version: number,
  options: RequestOptions<"SecretCreate">
) => DaemonResponse<"SecretCreate">;

export type Secrets = {
  list: List;
  create: Create;
  inspect: Inspect;
  delete: Delete;
  update: Update;
};

export type Response = {
  [K in Actions]: SuccessResponse<K>;
};
