import { requestDaemon } from "../http";
import * as C from "./containerT";
import { generateQueryParams, getErrorMessage } from "../util";

export const Container: C.Container = {
  async create({
    containerName,
    baseImage,
    platform = "",
    defaultCommand = [],
    options = {},
  }) {
    try {
      const { data } = await requestDaemon<C.Response["ContainerCreate"]>({
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
      await requestDaemon<C.Response["ContainerKill"]>({
        path: `containers/${containerIdOrName}/kill${generateQueryParams(
          options
        )}}`,
        method: "post",
      });

      return { message: `Killed container with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async start(containerIdOrName, options = {}) {
    try {
      await requestDaemon<C.Response["ContainerStart"]>({
        path: `containers/${containerIdOrName}/start${generateQueryParams(
          options
        )}`,
        method: "post",
      });

      return { message: `Stopped containter with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async stop(containerIdOrName, options = {}) {
    try {
      await requestDaemon<C.Response["ContainerStop"]>({
        path: `containers/${containerIdOrName}/stop${generateQueryParams(
          options
        )}`,
        method: "post",
      });

      return { message: `Stopped containter with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async delete(containerIdOrName) {
    try {
      await requestDaemon<C.Response["ContainerDelete"]>({
        path: `containers/${containerIdOrName}`,
        method: "delete",
      });

      return { message: `Deleted container with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async list(options = {}) {
    try {
      const { data } = await requestDaemon<C.Response["ContainerList"]>({
        path: `containers/json${generateQueryParams(options)}`,
        method: "get",
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async inspect(containerIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<C.Response["ContainerInspect"]>({
        path: `containers/${containerIdOrName}/json${generateQueryParams(
          options
        )}`,
        method: "get",
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async logs(containerIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<C.Response["ContainerLogs"]>({
        path: `containers/${containerIdOrName}/logs${generateQueryParams(
          options
        )}`,
        method: "get",
      });

      return { message: data };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async filesystemChanges(containerIdOrName) {
    try {
      const { data } = await requestDaemon<C.Response["ContainerChanges"]>({
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
      await requestDaemon<C.Response["ContainerPause"]>({
        path: `containers/${containerIdOrName}/pause`,
        method: "post",
      });

      return { message: `Paused container with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async unpause(containerIdOrName) {
    try {
      await requestDaemon<C.Response["ContainerUnpause"]>({
        path: `containers/${containerIdOrName}/unpause`,
        method: "post",
      });

      return { message: `Unpaused container with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async restart(containerIdOrName, options = {}) {
    try {
      await requestDaemon<C.Response["ContainerRestart"]>({
        path: `containers/${containerIdOrName}/restart${generateQueryParams(
          options
        )}`,
        method: "post",
      });

      return { message: `Restarted container with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async rename(containerIdOrName, newContainerName) {
    try {
      await requestDaemon<C.Response["ContainerRename"]>({
        path: `containers/${containerIdOrName}/rename?name=${newContainerName}`,
        method: "post",
      });

      return {
        message: `Container with id ${containerIdOrName} renamed to ${newContainerName}`,
      };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async top(containerIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<C.Response["ContainerTop"]>({
        path: `containers/${containerIdOrName}/top${generateQueryParams(
          options
        )}`,
        method: "get",
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async attachToContainerWebsocket(containerIdOrName, options = {}) {
    try {
      await requestDaemon<C.Response["ContainerAttachWebsocket"]>({
        path: `containers/${containerIdOrName}/attach/ws${generateQueryParams(
          options
        )}`,
        method: "get",
      });

      return { message: `Attached to container: ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async waitForContainer(containerIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<C.Response["ContainerWait"]>({
        path: `containers/${containerIdOrName}/wait${generateQueryParams(
          options
        )}`,
        method: "get",
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async deleteStoppedContainers(options = {}) {
    try {
      const { data } = await requestDaemon<C.Response["ContainerDelete"]>({
        path: `containers/prune${generateQueryParams(options)}`,
        method: "post",
      });

      return data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};
