import Container from "./container";
import Image from "./image";
import Secrets from "./secrets";
// import { Container as C } from "../types/container";
// import { Image as I } from "../types/image";
import axios from "axios";

const DockerDefaults = {
  url: "http://localhost/v1.41/",
  socketPath: "/var/run/docker.sock",
};

class Docker {
  url?: string;
  socketPath?: string;
  Container: typeof Container;
  Image: typeof Image;

  constructor({ url, socketPath }: { url?: string; socketPath?: string } = {}) {
    this.url = url || DockerDefaults.url;
    this.socketPath = socketPath || DockerDefaults.socketPath;
    this.Container = Container;
    this.Image = Image;
    axios.defaults.baseURL = this.url;
    axios.defaults.socketPath = this.socketPath;
  }
}

//testing
(async function () {})();

export { Docker, Container, Image, Secrets };
