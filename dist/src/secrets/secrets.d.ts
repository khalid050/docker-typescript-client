export declare const Secrets: Secrets;
import { SuccessResponse, Actions, QueryParams, RequestOptions } from "../response";
declare type DaemonResponse<T extends Actions> = Promise<SuccessResponse<T> extends string | number ? {
    message: string | number;
} : SuccessResponse<T>>;
declare type List = (options: QueryParams<"SecretList">) => DaemonResponse<"SecretList">;
declare type Create = (data: RequestOptions<"SecretCreate">) => DaemonResponse<"SecretCreate">;
declare type Inspect = (id: string) => DaemonResponse<"SecretInspect">;
declare type Delete = (id: string) => DaemonResponse<"SecretDelete">;
declare type Update = (id: string, version: number, options?: RequestOptions<"SecretUpdate">) => DaemonResponse<"SecretUpdate">;
declare type Secrets = {
    list: List;
    create: Create;
    inspect: Inspect;
    delete: Delete;
    update: Update;
};
export {};
