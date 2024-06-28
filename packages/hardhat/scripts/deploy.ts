const hre = require('hardhat');

async function main() {
  await hre.run("compile");

  const tuzo = await hre.ethers.deployContract('Tuzo');
  await tuzo.waitForDeployment();
  console.log(`Tuzo deployed to ${tuzo.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
