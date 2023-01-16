import { requestDaemon } from "src/http";
import { Secrets as S } from "../../types/secrets";
import { Response } from "../../types/response";
import { getErrorMessage } from "src/util";

export const Secrets: S = {
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
