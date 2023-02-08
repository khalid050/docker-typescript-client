import { requestDaemon } from "../http";
import { getErrorMessage } from "../util";
import {
  Response,
  QueryParams,
  RequestOptions,
  DaemonResponse,
} from "../response";

export const Networks: Networks = {
  async list(options = {}) {
    try {
      const { data } = await requestDaemon<Response["NetworkList"]>({
        path: "/networks",
        method: "get",
        queryParams: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async inspect(id, options = {}) {
    try {
      const { data } = await requestDaemon<Response["NetworkInspect"]>({
        path: `/networks/${id}`,
        method: "get",
        queryParams: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async remove(id) {
    try {
      const { data } = await requestDaemon<Response["NetworkDelete"]>({
        path: `/networks/${id}`,
        method: "delete",
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async create(options) {
    try {
      const { data } = await requestDaemon<Response["NetworkCreate"]>({
        path: "/networks/create",
        method: "post",
        data: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async connect(id, options = {}) {
    try {
      const { data } = await requestDaemon<Response["NetworkConnect"]>({
        path: `/networks/${id}/connect`,
        method: "post",
        data: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async disconnect(id, options = {}) {
    try {
      const { data } = await requestDaemon<Response["NetworkDisconnect"]>({
        path: `/networks/${id}/disconnect`,
        method: "post",
        data: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async deleteUnusedNetworks(options = {}) {
    try {
      const { data } = await requestDaemon<Response["NetworkDisconnect"]>({
        path: `/networks/prune`,
        method: "post",
        queryParams: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};

type ListNetworks = (
  options: QueryParams<"NetworkList">
) => DaemonResponse<"NetworkList">;

type InspectNetwork = (
  id: number,
  options: QueryParams<"NetworkInspect">
) => DaemonResponse<"NetworkInspect">;

type RemoveNetwork = (id: number) => DaemonResponse<"NetworkDelete">;

type CreateNetwork = (
  options: RequestOptions<"NetworkCreate">
) => DaemonResponse<"NetworkCreate">;

type Connect = (
  id: number,
  options: RequestOptions<"NetworkConnect">
) => DaemonResponse<"NetworkConnect">;

type Disconnect = (
  id: number,
  options: RequestOptions<"NetworkDisconnect">
) => DaemonResponse<"NetworkDisconnect">;

type DeleteUnusedNetworks = (
  options: RequestOptions<"NetworkPrune">
) => DaemonResponse<"NetworkPrune">;

type Networks = {
  list: ListNetworks;
  inspect: InspectNetwork;
  remove: RemoveNetwork;
  create: CreateNetwork;
  connect: Connect;
  disconnect: Disconnect;
  deleteUnusedNetworks: DeleteUnusedNetworks;
};
