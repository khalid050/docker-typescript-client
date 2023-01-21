import { QueryParams, RequestOptions, DaemonResponse } from "../response";
export declare const Container: Container;
declare type ContainerIdOrName = number | string;
declare type CreateContainer = (props: {
    containerName?: string;
    defaultCommand: string[];
    platform?: string;
    baseImage?: string;
    options?: Omit<RequestOptions<"ContainerCreate">, "Image" | "Cmd">;
}) => DaemonResponse<"ContainerCreate">;
declare type KillContainer = (containerIdOrName: ContainerIdOrName, options?: QueryParams<"ContainerKill">) => DaemonResponse<"ContainerKill">;
declare type StartContainer = (containerIdOrName: ContainerIdOrName, options: QueryParams<"ContainerStart">) => DaemonResponse<"ContainerStart">;
declare type StopContainer = (containerIdOrName: ContainerIdOrName, options: QueryParams<"ContainerStop">) => DaemonResponse<"ContainerStop">;
declare type DeleteContainer = (containerIdOrName: ContainerIdOrName) => DaemonResponse<"ContainerDelete">;
declare type RestartContainer = (containerIdOrName: ContainerIdOrName, options?: QueryParams<"ContainerRestart">) => DaemonResponse<"ContainerRestart">;
declare type InspectContainer = (containerIdOrName: ContainerIdOrName, options?: QueryParams<"ContainerInspect">) => DaemonResponse<"ContainerInspect">;
declare type ListContainers = (options?: QueryParams<"ContainerList">) => DaemonResponse<"ContainerList">;
declare type PauseContainer = (containerIdOrName: ContainerIdOrName) => DaemonResponse<"ContainerPause">;
declare type ContainerLogs = (containerIdOrName: ContainerIdOrName, options?: QueryParams<"ContainerLogs">) => DaemonResponse<"ContainerLogs">;
declare type UnpauseContainer = (containerIdOrName: ContainerIdOrName) => DaemonResponse<"ContainerUnpause">;
declare type ContainerFilesystemChanges = (containerIdOrName: ContainerIdOrName) => DaemonResponse<"ContainerChanges">;
declare type RenameContainer = (containerIdOrName: ContainerIdOrName, newContainerName: string) => DaemonResponse<"ContainerRename">;
declare type ContainerTop = (containerIdOrName: ContainerIdOrName, options?: QueryParams<"ContainerTop">) => DaemonResponse<"ContainerTop">;
declare type ContainerAttachWebsocket = (containerIdOrName: ContainerIdOrName, options?: QueryParams<"ContainerAttachWebsocket">) => DaemonResponse<"ContainerAttachWebsocket">;
declare type WaitForContainer = (containerIdOrName: ContainerIdOrName, options?: QueryParams<"ContainerWait">) => DaemonResponse<"ContainerWait">;
declare type ContainerPrune = (options?: QueryParams<"ContainerPrune">) => DaemonResponse<"ContainerPrune">;
declare type Container = {
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
export {};