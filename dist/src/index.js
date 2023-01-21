"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secrets = exports.Image = exports.Container = exports.Docker = void 0;
const container_1 = __importDefault(require("./container"));
exports.Container = container_1.default;
const image_1 = __importDefault(require("./image"));
exports.Image = image_1.default;
const secrets_1 = __importDefault(require("./secrets"));
exports.Secrets = secrets_1.default;
// import { Container as C } from "../types/container";
// import { Image as I } from "../types/image";
const axios_1 = __importDefault(require("axios"));
const DockerDefaults = {
    url: "http://localhost/v1.41/",
    socketPath: "/var/run/docker.sock",
};
class Docker {
    constructor({ url, socketPath } = {}) {
        this.url = url || DockerDefaults.url;
        this.socketPath = socketPath || DockerDefaults.socketPath;
        this.Container = container_1.default;
        this.Image = image_1.default;
        axios_1.default.defaults.baseURL = this.url;
        axios_1.default.defaults.socketPath = this.socketPath;
    }
}
exports.Docker = Docker;
//testing
(async function () { })();
