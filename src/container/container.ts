import { requestDaemon } from "../http";
// import { Container as C } from "../../types/container";
import { getErrorMessage } from "../util";
import {
  Response,
  QueryParams,
  RequestOptions,
  DaemonResponse,
} from "../response";
// import {
//   SuccessResponse,
//   Actions,
//   QueryParams,
//   RequestOptions,
//   DaemonResponse,
// } from "./response";

export const Container: Container = {
  async create({
    containerName,
    baseImage,
    platform = "",
    defaultCommand = [],
    options = {},
  }) {
    try {
      const { data } = await requestDaemon<Response["ContainerCreate"]>({
        path: `containers/create?name=${containerName}&platform=${platform}`,
        method: "post",
        data: {
          Image: baseImage,
          Cmd: defaultCommand,
          ...options,
        },
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async kill(containerIdOrName, options = {}) {
    try {
      return await requestDaemon<Response["ContainerKill"]>({
        path: `containers/${containerIdOrName}/kill`,
        method: "post",
        queryParams: options,
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async start(containerIdOrName, options = {}) {
    try {
      return await requestDaemon<Response["ContainerStart"]>({
        path: `containers/${containerIdOrName}/start`,
        method: "post",
        queryParams: options,
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async stop(containerIdOrName, options = {}) {
    try {
      return await requestDaemon<Response["ContainerStop"]>({
        path: `containers/${containerIdOrName}/stop`,
        method: "post",
        queryParams: options,
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async delete(containerIdOrName) {
    try {
      return await requestDaemon<Response["ContainerDelete"]>({
        path: `containers/${containerIdOrName}`,
        method: "delete",
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async list(options = {}) {
    try {
      const { data } = await requestDaemon<Response["ContainerList"]>({
        path: "containers/json",
        method: "get",
        queryParams: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async inspect(containerIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ContainerInspect"]>({
        path: `containers/${containerIdOrName}/json`,
        method: "get",
        queryParams: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async logs(containerIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ContainerLogs"]>({
        path: `containers/${containerIdOrName}/logs`,
        method: "get",
        queryParams: options,
      });

      return { data };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async filesystemChanges(containerIdOrName) {
    try {
      const { data } = await requestDaemon<Response["ContainerChanges"]>({
        path: `containers/${containerIdOrName}/changes`,
        method: "get",
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async pause(containerIdOrName) {
    try {
      return await requestDaemon<Response["ContainerPause"]>({
        path: `containers/${containerIdOrName}/pause`,
        method: "post",
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async unpause(containerIdOrName) {
    try {
      return await requestDaemon<Response["ContainerUnpause"]>({
        path: `containers/${containerIdOrName}/unpause`,
        method: "post",
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async restart(containerIdOrName, options = {}) {
    try {
      return await requestDaemon<Response["ContainerRestart"]>({
        path: `containers/${containerIdOrName}/restart`,
        method: "post",
        queryParams: options,
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async rename(containerIdOrName, newContainerName) {
    try {
      return await requestDaemon<Response["ContainerRename"]>({
        path: `containers/${containerIdOrName}/rename?name=${newContainerName}`,
        method: "post",
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async top(containerIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ContainerTop"]>({
        path: `containers/${containerIdOrName}/top`,
        method: "get",
        queryParams: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async attachToContainerWebsocket(containerIdOrName, options = {}) {
    try {
      return await requestDaemon<Response["ContainerAttachWebsocket"]>({
        path: `containers/${containerIdOrName}/attach/ws`,
        method: "get",
        queryParams: options,
      });
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async waitForContainer(containerIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ContainerWait"]>({
        path: `containers/${containerIdOrName}/wait`,
        method: "get",
        queryParams: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async deleteStoppedContainers(options = {}) {
    try {
      const { data } = await requestDaemon<Response["ContainerDelete"]>({
        path: "containers/prune",
        method: "post",
        queryParams: options,
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};

type ContainerIdOrName = number | string;

type CreateContainer = (props: {
  containerName?: string;
  defaultCommand: string[];
  platform?: string;
  baseImage?: string;
  options?: Omit<RequestOptions<"ContainerCreate">, "Image" | "Cmd">;
}) => DaemonResponse<"ContainerCreate">;

type KillContainer = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerKill">
) => DaemonResponse<"ContainerKill">;

type StartContainer = (
  containerIdOrName: ContainerIdOrName,
  options: QueryParams<"ContainerStart">
) => DaemonResponse<"ContainerStart">;

type StopContainer = (
  containerIdOrName: ContainerIdOrName,
  options: QueryParams<"ContainerStop">
) => DaemonResponse<"ContainerStop">;

type DeleteContainer = (
  containerIdOrName: ContainerIdOrName
) => DaemonResponse<"ContainerDelete">;

type RestartContainer = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerRestart">
) => DaemonResponse<"ContainerRestart">;

type InspectContainer = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerInspect">
) => DaemonResponse<"ContainerInspect">;

type ListContainers = (
  options?: QueryParams<"ContainerList">
) => DaemonResponse<"ContainerList">;

type PauseContainer = (
  containerIdOrName: ContainerIdOrName
) => DaemonResponse<"ContainerPause">;

type ContainerLogs = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerLogs">
) => DaemonResponse<"ContainerLogs">;

type UnpauseContainer = (
  containerIdOrName: ContainerIdOrName
) => DaemonResponse<"ContainerUnpause">;

type ContainerFilesystemChanges = (
  containerIdOrName: ContainerIdOrName
) => DaemonResponse<"ContainerChanges">;

type RenameContainer = (
  containerIdOrName: ContainerIdOrName,
  newContainerName: string
) => DaemonResponse<"ContainerRename">;

type ContainerTop = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerTop">
) => DaemonResponse<"ContainerTop">;

type ContainerAttachWebsocket = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerAttachWebsocket">
) => DaemonResponse<"ContainerAttachWebsocket">;

type WaitForContainer = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerWait">
) => DaemonResponse<"ContainerWait">;

type ContainerPrune = (
  options?: QueryParams<"ContainerPrune">
) => DaemonResponse<"ContainerPrune">;

type Container = {
  create: CreateContainer;
  list: ListContainers;
  delete: DeleteContainer;
  kill: KillContainer;
  start: StartContainer;
  stop: StopContainer;
  inspect: InspectContainer;
  logs: ContainerLogs;
  filesystemChanges: ContainerFilesystemChanges;
  pause: PauseContainer;
  unpause: UnpauseContainer;
  restart: RestartContainer;
  rename: RenameContainer;
  top: ContainerTop;
  attachToContainerWebsocket: ContainerAttachWebsocket;
  waitForContainer: WaitForContainer;
  deleteStoppedContainers: ContainerPrune;
};
