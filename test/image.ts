import { assert } from "node:console";
import test from "node:test";
import { Image } from "../src";

test("Should build an Ubuntu Image", async () => {
  const imageTag = "myubuntuimage";
  await Image.build(`${process.cwd()}/test/archive`, {
    t: imageTag,
  });

  const myubuntuimage = await Image.inspect(imageTag);
  assert(myubuntuimage.RepoTags?.includes("myimage:latest"));
});
