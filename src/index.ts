import Container from "./container";
import Image from "./image";

async function main() {
  const builtImage = await Image.build();
}

(async function () {
  await main();
})();

export { Container, Image };
