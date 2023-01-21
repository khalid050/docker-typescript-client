"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const http_1 = require("../http");
// import { Container as C } from "../../types/container";
const util_1 = require("../util");
// import {
//   SuccessResponse,
//   Actions,
//   QueryParams,
//   RequestOptions,
//   DaemonResponse,
// } from "./response";
exports.Container = {
    async create({ containerName, baseImage, platform = "", defaultCommand = [], options = {}, }) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `containers/create?name=${containerName}&platform=${platform}`,
                method: "post",
                data: Object.assign({ Image: baseImage, Cmd: defaultCommand }, options),
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async kill(containerIdOrName, options = {}) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/kill`,
                method: "post",
                queryParams: options,
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async start(containerIdOrName, options = {}) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/start`,
                method: "post",
                queryParams: options,
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async stop(containerIdOrName, options = {}) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/stop`,
                method: "post",
                queryParams: options,
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async delete(containerIdOrName) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}`,
                method: "delete",
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async list(options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: "containers/json",
                method: "get",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async inspect(containerIdOrName, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/json`,
                method: "get",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async logs(containerIdOrName, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/logs`,
                method: "get",
                queryParams: options,
            });
            return { data };
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async filesystemChanges(containerIdOrName) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/changes`,
                method: "get",
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async pause(containerIdOrName) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/pause`,
                method: "post",
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async unpause(containerIdOrName) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/unpause`,
                method: "post",
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async restart(containerIdOrName, options = {}) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/restart`,
                method: "post",
                queryParams: options,
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async rename(containerIdOrName, newContainerName) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/rename?name=${newContainerName}`,
                method: "post",
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async top(containerIdOrName, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/top`,
                method: "get",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async attachToContainerWebsocket(containerIdOrName, options = {}) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/attach/ws`,
                method: "get",
                queryParams: options,
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async waitForContainer(containerIdOrName, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `containers/${containerIdOrName}/wait`,
                method: "get",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async deleteStoppedContainers(options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: "containers/prune",
                method: "post",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
};
