"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestDaemon = void 0;
const axios_1 = __importDefault(require("axios"));
const util_1 = require("./util");
axios_1.default.defaults.headers.post = { "Content-Type": "application/json" };
axios_1.default.defaults.responseType = "json";
const requestDaemon = async ({ method, data, path, headers, queryParams, }) => {
    path = `${path}${(0, util_1.generateQueryParams)(queryParams)}`;
    return (0, axios_1.default)({ method, data, url: path, headers });
};
exports.requestDaemon = requestDaemon;
