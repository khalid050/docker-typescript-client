import axios, { AxiosPromise } from "axios";

axios.defaults.baseURL = "http://localhost/v1.41/";
axios.defaults.socketPath = "/var/run/docker.sock";
axios.defaults.headers.post = { "Content-Type": "application/json" };
axios.defaults.responseType = "json";

type Http = {
  method: "get" | "post" | "delete" | "head";
  path: string;
  data?: { [key: string]: any };
};

export const requestDaemon = async <T>({
  method,
  data,
  path,
}: Http): AxiosPromise<T> => {
  return axios({ method, data, url: path });
};
