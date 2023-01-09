import {
  SuccessResponse,
  Actions,
  QueryParams,
  RequestOptions,
  DaemonResponse,
} from "../../response";

type List = (props?: QueryParams<"ImageList">) => DaemonResponse<"ImageList">;

type Build = (
  tarArchivePath: string,
  options: QueryParams<"ImageBuild">
) => DaemonResponse<"ImageBuild">;

type Inspect = (imageIdOrName: string) => DaemonResponse<"ImageInspect">;

type Remove = (
  imageIdOrName: string,
  options?: QueryParams<"ImageDelete">
) => DaemonResponse<"ImageDelete">;

type Tag = (
  imageIdOrName: string,
  options: QueryParams<"ImageTag">
) => DaemonResponse<"ImageTag">;

type History = (imageIdOrName: string) => DaemonResponse<"ImageHistory">;

type DeleteBuilderCache = (options?: QueryParams<"BuildPrune">) => void;

type Search = (
  term: string,
  options?: Omit<QueryParams<"ImageSearch">, "term">
) => DaemonResponse<"ImageSearch">;

type DeleteUnusedImages = (
  options?: QueryParams<"ImagePrune">
) => DaemonResponse<"ImagePrune">;

export type Image = {
  list: List;
  build: Build;
  inspect: Inspect;
  remove: Remove;
  tag: Tag;
  history: History;
  deleteBuilderCache: DeleteBuilderCache;
  search: Search;
  deleteUnusedImages: DeleteUnusedImages;
};
