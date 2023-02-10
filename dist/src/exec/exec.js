"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exec = void 0;
const http_1 = require("../http");
const util_1 = require("../util");
exports.Exec = {
    async create(id, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/container/${id}/exec`,
                method: "post",
                data: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async start(id, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/container/${id}/start`,
                method: "post",
                data: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async resize(id, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/exec/${id}/resize`,
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
                path: `/exec/${id}/json`,
                method: "get",
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
};
