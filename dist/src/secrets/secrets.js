"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secrets = void 0;
const http_1 = require("../http");
// import { Secrets as S } from "../../types/secrets";
// import { Response } from "../../types/response";
const util_1 = require("../util");
exports.Secrets = {
    async list(options) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: "/secrets",
                method: "get",
                queryParams: options,
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
                path: "/secrets",
                method: "post",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async inspect(id) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: "/secrets",
                method: "get",
                queryParams: { id },
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async delete(id) {
        try {
            return await (0, http_1.requestDaemon)({
                path: "/secrets",
                method: "delete",
                queryParams: { id },
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async update(id, version, options = {}) {
        try {
            return await (0, http_1.requestDaemon)({
                path: `/secrets/${id}/update`,
                method: "post",
                queryParams: { version },
                data: options,
            });
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
};
