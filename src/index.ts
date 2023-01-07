import Container from "./container";
import Image from "./image";
import fs from "fs";
async function main() {
  // const builtImage = await Image.build(`${process.cwd()}/src/archive`, {t: 'myimage'});
  // console.log({ builtImage });
  // const images = await Image.list();
  // console.log({ images });
  const u = await Image.inspect('myimage');
  console.log({u})
}

(async function () {
  await main();
})();

export { Container, Image };
