import Container from "./container";

async function main() {
  const container = await Container.createContainer({
    baseImage: "alpine:latest",
    containerName: "myAlpinecoNTAINERAA",
    defaultCommand: ["echo", "hi"],
  });
  console.log(container);
}

(async function () {
  await main();
})();

export { Container };
