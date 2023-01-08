import { requestDaemon } from "../http";
import { Container as C } from "./containerT";
import { getErrorMessage } from "../util";
import { Response } from "../../response";

export const Container: C = {
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
      await requestDaemon<Response["ContainerKill"]>({
        path: `containers/${containerIdOrName}/kill`,
        method: "post",
        queryParams: options,
      });

      return { message: `Killed container with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async start(containerIdOrName, options = {}) {
    try {
      await requestDaemon<Response["ContainerStart"]>({
        path: `containers/${containerIdOrName}/start`,
        method: "post",
        queryParams: options,
      });

      return { message: `Stopped containter with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async stop(containerIdOrName, options = {}) {
    try {
      await requestDaemon<Response["ContainerStop"]>({
        path: `containers/${containerIdOrName}/stop`,
        method: "post",
        queryParams: options,
      });

      return { message: `Stopped containter with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async delete(containerIdOrName) {
    try {
      await requestDaemon<Response["ContainerDelete"]>({
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

      return { message: data };
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
      await requestDaemon<Response["ContainerPause"]>({
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
      await requestDaemon<Response["ContainerUnpause"]>({
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
      await requestDaemon<Response["ContainerRestart"]>({
        path: `containers/${containerIdOrName}/restart`,
        method: "post",
        queryParams: options,
      });

      return { message: `Restarted container with id ${containerIdOrName}` };
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  async rename(containerIdOrName, newContainerName) {
    try {
      await requestDaemon<Response["ContainerRename"]>({
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
      await requestDaemon<Response["ContainerAttachWebsocket"]>({
        path: `containers/${containerIdOrName}/attach/ws`,
        method: "get",
        queryParams: options,
      });

      return { message: `Attached to container: ${containerIdOrName}` };
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
