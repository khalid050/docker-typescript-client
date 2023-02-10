import { requestDaemon } from "../http";
import { getErrorMessage } from "../util";
import {
  Response,
  QueryParams,
  RequestOptions,
  DaemonResponse,
} from "../response";

export const Exec: Exec = {
  async create(id, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ContainerExec"]>({
        path: `/container/${id}/exec`,
        method: "post",
        data: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async start(id, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ExecStart"]>({
        path: `/container/${id}/start`,
        method: "post",
        data: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async resize(id, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ExecResize"]>({
        path: `/exec/${id}/resize`,
        method: "post",
        queryParams: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async inspect(id) {
    try {
      const { data } = await requestDaemon<Response["ExecInspect"]>({
        path: `/exec/${id}/json`,
        method: "get",
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};

type Create = (
  id: number,
  options: RequestOptions<"ContainerExec">
) => DaemonResponse<"ContainerExec">;

type Start = (
  id: number,
  options: RequestOptions<"ExecStart">
) => DaemonResponse<"ExecStart">;

type Resize = (
  id: number,
  options: RequestOptions<"ExecResize">
) => DaemonResponse<"ExecResize">;

type Inspect = (id: number) => DaemonResponse<"ExecInspect">;

type Exec = {
  create: Create;
  start: Start;
  resize: Resize;
  inspect: Inspect
};
