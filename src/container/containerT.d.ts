import {
  SuccessResponse,
  Actions,
  QueryParams,
  RequestOptions,
} from "../../response";

type ContainerIdOrName = number | string;

type Res<T extends Actions> = Promise<
  SuccessResponse<T> extends string | number
    ? { message: string | number }
    : SuccessResponse<T>
>;

type CreateContainer = (props: {
  containerName?: string;
  defaultCommand: string[];
  platform?: string
  baseImage?: string;
  options?: Omit<RequestOptions<"ContainerCreate">, "Image" | "Cmd">
}) => Res<"ContainerCreate">;

type KillContainer = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerKill">
) => Res<"ContainerKill">;

type StartContainer = (
  containerIdOrName: ContainerIdOrName,
  options: QueryParams<"ContainerStart">
) => Res<"ContainerStart">;

type StopContainer = (
  containerIdOrName: ContainerIdOrName,
  options: QueryParams<"ContainerStop">
) => Res<"ContainerStop">;

type DeleteContainer = (
  containerIdOrName: ContainerIdOrName
) => Res<"ContainerDelete">;

type RestartContainer = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerRestart">
) => Res<"ContainerRestart">;

type InspectContainer = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerInspect">
) => Res<"ContainerInspect">;

type ListContainers = (
  options: QueryParams<"ContainerList">
) => Res<"ContainerList">;

type PauseContainer = (
  containerIdOrName: ContainerIdOrName
) => Res<"ContainerPause">;

type ContainerLogs = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerLogs">
) => Res<"ContainerLogs">;

type UnpauseContainer = (
  containerIdOrName: ContainerIdOrName
) => Res<"ContainerUnpause">;

type ContainerFilesystemChanges = (
  containerIdOrName: ContainerIdOrName
) => Res<"ContainerChanges">;

type RenameContainer = (
  containerIdOrName: ContainerIdOrName,
  newContainerName: string
) => Res<"ContainerRename">;

type ContainerTop = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerTop">
) => Res<"ContainerTop">;

type ContainerAttachWebsocket = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerAttachWebsocket">
) => Res<"ContainerAttachWebsocket">;

type WaitForContainer = (
  containerIdOrName: ContainerIdOrName,
  options?: QueryParams<"ContainerWait">
) => Res<"ContainerWait">;

type ContainerPrune = (
  options?: QueryParams<"ContainerPrune">
) => Res<"ContainerPrune">;

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

export type Response = {
  [K in Actions]: SuccessResponse<K>
}
