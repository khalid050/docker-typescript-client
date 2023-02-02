import axios from "axios";

import Container from "./container";
import Image from "./image";
import Secrets from "./secrets";

const DockerDefaults = {
  url: "http://localhost/v1.41/",
  socketPath: "/var/run/docker.sock",
} as const;

class Docker {
  url?: string;
  socketPath?: string;
  
  constructor({
    url = DockerDefaults.url,
    socketPath = DockerDefaults.socketPath,
  }: { url?: string; socketPath?: string } = {}) {
    this.url = url;
    this.socketPath = socketPath;
    axios.defaults.baseURL = this.url;
    axios.defaults.socketPath = this.socketPath;
  }

  Container = Container;
  Image = Image;
}

// testing
(async function () {})();

export { Docker, Container, Image, Secrets };
