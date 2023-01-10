import {
  SuccessResponse,
  Actions,
  QueryParams,
  RequestOptions,
  DaemonResponse,
} from "./response";

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

export type Container = {
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
