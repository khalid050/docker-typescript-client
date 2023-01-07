import Container from "./container";
import Image from "./image";
async function main() {
  // const imageTag = "myubuntuimage";
  // await Image.build(`${process.cwd()}/test/archive`, {
  //   t: imageTag,
  // });

  // const myubuntuimage = await Image.inspect(imageTag);
  // const res = await Image.remove(imageTag);
  // console.log({ res });
}

(async function () {
  await main();
})();

export { Container, Image };
