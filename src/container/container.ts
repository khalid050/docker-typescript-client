import { requestDaemon } from "../http";
import * as C from "./containerT";
import { generateQueryParams, getErrorMessage } from "../util";

export const Container: C.Container = {
  async createContainer({ baseImage, defaultCommand = [], options = {} }) {
    try {
      const { data } = await requestDaemon<C.Response["ContainerCreate"]>({
        path: "containers/create",
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

  async killContainer(containerIdOrName, options = {}) {
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

  async startContainer(containerIdOrName, options = {}) {
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

  async stopContainer(containerIdOrName, options = {}) {
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

  async deleteContainer(containerIdOrName) {
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

  async listContainers(options = {}) {
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

  async inspectContainer(containerIdOrName, options = {}) {
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

  async containerLogs(containerIdOrName, options = {}) {
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

  async containerFilesystemChanges(containerIdOrName) {
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

  async pauseContainer(containerIdOrName) {
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

  async unpauseContainer(containerIdOrName) {
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

  async restartContainer(containerIdOrName, options = {}) {
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

  async renameContainer(containerIdOrName, newContainerName) {
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

  async containerTop(containerIdOrName, options = {}) {
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
