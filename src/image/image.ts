import { getErrorMessage } from "../util";
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

  async build(options = {}) {
    try {
      tar
        .pack(`${process.cwd()}/src/archive`)
        .pipe(fs.createWriteStream(`${process.cwd()}/src/docker.tar`));

      const archive = fs.readFileSync(`${process.cwd()}/src/docker.tar`);

      const a = {
        path: "/build",
        method: "POST",
        socketPath: "/var/run/docker.sock",
        headers: {
          "Content-Type": "application/x-tar",
          "Content-Length": archive.length,
        },
      };

      const req = http.request(a, (res) => {
        res.on("data", (d) => {
          process.stdout.write(d);
        });
      });

      req.write(archive);
      // await requestDaemon<I.Response["ImageBuild"]>({
      //   path: "/build",
      //   method: "post",
      //   queryParams: options,
      //   headers: {
      //     "Content-type": "application/x-tar",
      //     'Content-Length': archive.length
      //   },
      //   data: {
      //     "application/octet-stream": archive,
      //   },
      // });

      // return { message: "Image built" };
    } catch (error) {
      console.log(error);
      throw new Error(getErrorMessage(error));
    }
  },
};
