import { assert } from "node:console";
import test, { after } from "node:test";
import { Docker } from "../src";

test("Should build an Ubuntu Image", async () => {
  const { Image } = new Docker();
  after(async () => await Image.remove(imageTag));
  const imageTag = "myubuntuimage";
  await Image.build(`${process.cwd()}/test/archive`, {
    t: imageTag,
  });

  const myubuntuimage = await Image.inspect(imageTag);
  assert(myubuntuimage.RepoTags?.includes("myimage:latest"));
});
