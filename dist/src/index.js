"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docker = void 0;
const axios_1 = __importDefault(require("axios"));
const container_1 = __importDefault(require("./container"));
const image_1 = __importDefault(require("./image"));
const networks_1 = __importDefault(require("./networks"));
const secrets_1 = __importDefault(require("./secrets"));
const exec_1 = __importDefault(require("./exec"));
const DockerDefaults = {
    url: "http://localhost/v1.41/",
    socketPath: "/var/run/docker.sock",
};
class Docker {
    constructor({ url = DockerDefaults.url, socketPath = DockerDefaults.socketPath, } = {}) {
        this.Container = container_1.default;
        this.Image = image_1.default;
        this.Networks = networks_1.default;
        this.Secrets = secrets_1.default;
        this.Exec = exec_1.default;
        this.url = url;
        this.socketPath = socketPath;
        axios_1.default.defaults.baseURL = this.url;
        axios_1.default.defaults.socketPath = this.socketPath;
    }
}
exports.Docker = Docker;
// testing
(async function () {
    const { Image } = new Docker();
    const imageTag = "myubuntuimage";
    await Image.build(`${process.cwd()}/test/archive`, {
        t: imageTag,
    });
    const myubuntuimage = await Image.inspect(imageTag);
    console.log({ myubuntuimage });
})();
