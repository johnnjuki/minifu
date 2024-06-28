const hre = require('hardhat');

async function main() {
  await hre.run("compile");

  const minifu = await hre.ethers.deployContract('Minifu');
  await minifu.waitForDeployment();
  console.log(`Minifu deployed to ${minifu.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
