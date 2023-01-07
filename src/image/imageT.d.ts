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
  options?: QueryParams<"ImagePrune">
) => Res<"ImagePrune">;

export type Image = {
  list: List;
  build: Build;
  inspect: Inspect;
  remove: Remove;
};

export type Response = {
  [K in Actions]: SuccessResponse<K>;
};
