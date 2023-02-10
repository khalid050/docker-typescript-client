"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Networks = void 0;
const http_1 = require("../http");
const util_1 = require("../util");
exports.Networks = {
    async list(options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: "/networks",
                method: "get",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async inspect(id, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/networks/${id}`,
                method: "get",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async remove(id) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/networks/${id}`,
                method: "delete",
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async create(options) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: "/networks/create",
                method: "post",
                data: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async connect(id, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/networks/${id}/connect`,
                method: "post",
                data: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async disconnect(id, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/networks/${id}/disconnect`,
                method: "post",
                data: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async deleteUnusedNetworks(options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/networks/prune`,
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
