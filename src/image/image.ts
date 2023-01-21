import { generateQueryParams, getErrorMessage } from "../util";
import { requestDaemon } from "../http";
// import { Image as I } from "../../types/image";
import {
  Response,
  QueryParams,
  DaemonResponse,
} from "../response";

import fs from "fs";
import tar from "tar-fs";
import http from "http";

export const Image: Image = {
  async list(options = {}) {
    try {
      const { data } = await requestDaemon<Response["ImageList"]>({
        path: `/images/json`,
        method: "get",
        queryParams: options,
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async build(tarArchivePath, options = {}) {
    return new Promise((resolve, reject) => {
      const outputPath = `${process.cwd()}/src/tmp/docker.tar`;
      tar.pack(tarArchivePath).pipe(fs.createWriteStream(outputPath));
      const archive = fs.readFileSync(outputPath);

      const a = {
        path: `/build${generateQueryParams(options)}`,
        method: "POST",
        socketPath: "/var/run/docker.sock",
        headers: {
          "Content-Type": "application/x-tar",
          "Content-Length": archive.length,
        },
        data: archive,
      };

      let data = "";
      const req = http.request(a, (res) => {
        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(data);
        });

        res.on("error", (error) => {
          reject(error);
        });
      });

      req.write(archive);
      req.end();
    });
  },

  async inspect(imageIdOrName) {
    try {
      const { data } = await requestDaemon<Response["ImageInspect"]>({
        path: `/images/${imageIdOrName}/json`,
        method: "get",
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async remove(imageIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ImageDelete"]>({
        path: `/images/${imageIdOrName}`,
        method: "delete",
        queryParams: options,
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async tag(imageIdOrName, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ImageTag"]>({
        path: `/images/${imageIdOrName}`,
        method: "post",
        queryParams: options,
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async history(imageIdOrName) {
    try {
      const { data } = await requestDaemon<Response["ImageHistory"]>({
        path: `/images/${imageIdOrName}/history`,
        method: "get",
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteBuilderCache(options = {}) {
    try {
      const { data } = await requestDaemon<Response["BuildPrune"]>({
        path: `/build/prune`,
        method: "post",
        queryParams: options,
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async search(term, options = {}) {
    try {
      const { data } = await requestDaemon<Response["ImageSearch"]>({
        path: `/images/search`,
        method: "get",
        queryParams: { term, ...options },
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteUnusedImages(options = {}) {
    try {
      const { data } = await requestDaemon<Response["ImagePrune"]>({
        path: "/images/prune",
        method: "get",
        queryParams: options,
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

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

type Image = {
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
