import { AxiosPromise } from "axios";
declare type Http = {
    method: "get" | "post" | "delete" | "head";
    path: string;
    data?: {
        [key: string]: any;
    };
    headers?: {
        [key: string]: any;
    };
    queryParams?: {
        [key: string]: any;
    };
};
export declare const requestDaemon: <T>({ method, data, path, headers, queryParams, }: Http) => AxiosPromise<T>;
export {};
