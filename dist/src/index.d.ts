import Container from "./container";
import Image from "./image";
import Secrets from "./secrets";
declare class Docker {
    url?: string;
    socketPath?: string;
    Container: typeof Container;
    Image: typeof Image;
    constructor({ url, socketPath }?: {
        url?: string;
        socketPath?: string;
    });
}
export { Docker, Container, Image, Secrets };
