import axios from "axios";

import Container from "./container";
import Image from "./image";
import Networks from "./networks";
import Secrets from "./secrets";
import Exec from "./exec";

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
  Networks = Networks;
  Secrets = Secrets;
  Exec = Exec;
}

// testing
(async function () {})();

export { Docker };
