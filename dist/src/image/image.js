"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const util_1 = require("../util");
const http_1 = require("../http");
const fs_1 = __importDefault(require("fs"));
const tar_fs_1 = __importDefault(require("tar-fs"));
const http_2 = __importDefault(require("http"));
exports.Image = {
    async list(options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/images/json`,
                method: "get",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async build(tarArchivePath, options = {}) {
        return new Promise((resolve, reject) => {
            const outputPath = `${process.cwd()}/src/tmp/docker.tar`;
            tar_fs_1.default.pack(tarArchivePath).pipe(fs_1.default.createWriteStream(outputPath));
            const archive = fs_1.default.readFileSync(outputPath);
            const a = {
                path: `/build${(0, util_1.generateQueryParams)(options)}`,
                method: "POST",
                socketPath: "/var/run/docker.sock",
                headers: {
                    "Content-Type": "application/x-tar",
                    "Content-Length": archive.length,
                },
                data: archive,
            };
            let data = "";
            const req = http_2.default.request(a, (res) => {
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
            const { data } = await (0, http_1.requestDaemon)({
                path: `/images/${imageIdOrName}/json`,
                method: "get",
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async remove(imageIdOrName, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/images/${imageIdOrName}`,
                method: "delete",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async tag(imageIdOrName, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/images/${imageIdOrName}`,
                method: "post",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async history(imageIdOrName) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/images/${imageIdOrName}/history`,
                method: "get",
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async deleteBuilderCache(options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/build/prune`,
                method: "post",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async search(term, options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: `/images/search`,
                method: "get",
                queryParams: Object.assign({ term }, options),
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
    async deleteUnusedImages(options = {}) {
        try {
            const { data } = await (0, http_1.requestDaemon)({
                path: "/images/prune",
                method: "get",
                queryParams: options,
            });
            return data;
        }
        catch (error) {
            throw new Error((0, util_1.getErrorMessage)(error));
        }
    },
};
