import axios, { AxiosPromise } from "axios";
import { generateQueryParams } from "./util";

// axios.defaults.baseURL = "http://localhost/v1.41/";
axios.defaults.socketPath = "/var/run/docker.sock";
axios.defaults.headers.post = { "Content-Type": "application/json" };
axios.defaults.responseType = "json";

type Http = {
  method: "get" | "post" | "delete" | "head";
  path: string;
  data?: { [key: string]: any };
  headers?: { [key: string]: any };
  queryParams?: { [key: string]: any };
};

export const requestDaemon = async <T>({
  method,
  data,
  path,
  headers,
  queryParams,
}: Http): AxiosPromise<T> => {
  path = `${path}${generateQueryParams(queryParams)}`;
  return axios({ method, data, url: path, headers });
};
