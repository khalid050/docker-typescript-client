import {
  SuccessResponse,
  Actions,
  QueryParams,
  RequestOptions,
} from "../../response";

type Res<T extends Actions> = Promise<
  SuccessResponse<T> extends string | number
    ? { message: string | number }
    : SuccessResponse<T>
>;

type List = (props?: QueryParams<"ImageList">) => Res<"ImageList">;

type Build = (
  tarArchivePath: string,
  options: QueryParams<"ImageBuild">
) => Res<"ImageBuild">;

type Inspect = (imageIdOrName: string) => Res<"ImageInspect">;

type Remove = (
  imageIdOrName: string,
  options?: QueryParams<"ImageDelete">
) => Res<"ImageDelete">;

type Tag = (
  imageIdOrName: string,
  options: QueryParams<"ImageTag">
) => Res<"ImageTag">;

type History = (imageIdOrName: string) => Res<"ImageHistory">;

type DeleteBuilderCache = (options?: QueryParams<"BuildPrune">) => void;

type Search = (
  term: string,
  options?: Omit<QueryParams<"ImageSearch">, "term">
) => Res<"ImageSearch">;

type DeleteUnusedImages = (
  options?: QueryParams<"ImagePrune">
) => Res<"ImagePrune">;

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

export type Response = {
  [K in Actions]: SuccessResponse<K>;
};
