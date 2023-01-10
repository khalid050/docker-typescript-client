import Container from "./container";
import { Container as C } from "../types/container";
import { Image as I } from "../types/image";
import Image from "./image";
import axios from "axios";

const DockerDefaults = {
  url: "http://localhost/v1.41/",
  socketPath: "/var/run/docker.sock",
};

class Docker {
  url?: string;
  socketPath?: string;
  Container: C;
  Image: I;

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

export { Docker, Container, Image };
