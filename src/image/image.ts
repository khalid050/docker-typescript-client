import { generateQueryParams, getErrorMessage } from "../util";
import { requestDaemon } from "../http";
import * as I from "./imageT";

import fs from "fs";
import tar from "tar-fs";
import http from "http";

export const Image: I.Image = {
  async list(options = {}) {
    try {
      const { data } = await requestDaemon<I.Response["ImageList"]>({
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
      const outputPath = `${process.cwd()}/src/docker.tar`;
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
      const { data } = await requestDaemon<I.Response["ImageInspect"]>({
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
      const { data } = await requestDaemon<I.Response["ImagePrune"]>({
        path: `/images/${imageIdOrName}`,
        method: "delete",
        queryParams: options
      });

      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
