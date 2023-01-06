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
type Build = (props?: QueryParams<"ImageBuild">) => Res<"ImageBuild">;

export type Image = {
  list: ListImages;
  build: BuildImage;
};

export type Response = {
  [K in Actions]: SuccessResponse<K>;
};
