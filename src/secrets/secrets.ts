import { requestDaemon } from "../http";
import { getErrorMessage } from "../util";

export const Secrets: Secrets = {
  async list(options: {}) {
    try {
      const { data } = await requestDaemon<Response["SecretList"]>({
        path: "/secrets",
        method: "get",
        queryParams: options,
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async create(options: {}) {
    try {
      const { data } = await requestDaemon<Response["SecretCreate"]>({
        path: "/secrets",
        method: "post",
        queryParams: options,
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async inspect(id) {
    try {
      const { data } = await requestDaemon<Response["SecretInspect"]>({
        path: "/secrets",
        method: "get",
        queryParams: { id },
      });
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async delete(id) {
    try {
      return await requestDaemon<Response["SecretDelete"]>({
        path: "/secrets",
        method: "delete",
        queryParams: { id },
      });
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async update(id, version, options = {}) {
    try {
      return await requestDaemon<Response["SecretUpdate"]>({
        path: `/secrets/${id}/update`,
        method: "post",
        queryParams: { version },
        data: options,
      });
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

import {
  SuccessResponse,
  Actions,
  QueryParams,
  RequestOptions,
  Response
} from "../response";

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
  options?: RequestOptions<"SecretUpdate">
) => DaemonResponse<"SecretUpdate">;

type Secrets = {
  list: List;
  create: Create;
  inspect: Inspect;
  delete: Delete;
  update: Update;
};
