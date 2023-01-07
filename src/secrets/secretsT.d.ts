import {
  SuccessResponse,
  Actions,
  QueryParams,
  RequestOptions,
} from "../../response";

type Res<T extends Actions> = Promise<
  SuccessResponse<T> extends string | number
    ? { message: string | number }
    : SuccessResponse<T>
>;

type List = (options: QueryParams<"SecretList">) => Res<"SecretList">;

type Create = (data: RequestOptions<"SecretCreate">) => Res<"SecretCreate">;

type Inspect = (id: string) => Res<"SecretInspect">;

type Delete = (id: string) => Res<"SecretDelete">;

type Update = (
  id: string,
  version: number,
  options: RequestOptions<"SecretCreate">
) => Res<"SecretCreate">;

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
