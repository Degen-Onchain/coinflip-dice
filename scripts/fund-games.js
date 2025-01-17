const fs = require("fs-extra");
const path = require("path");
const { exit } = require("process");
const FakeUSDCToken = artifacts.require("utils/FakeUSDCToken");

module.exports = async (deployer, network, accounts) => {
  const networkId = await web3.eth.net.getId();
  console.log(`Network ID: ${networkId}`);

  // Read contracts.json
  const variablesPath = path.join(__dirname, "..", "contracts.json");
  const data = JSON.parse(fs.readFileSync(variablesPath, "utf8"));
  const networkData = data[data.NETWORKS[networkId]];

  const fakeToken = await FakeUSDCToken.deployed();
  console.log(`FakeUSDCToken loaded.`);

  console.log(`Minting 10000 tokens to Games list...`);
  const addresses = [
    networkData.COIN_FLIP,
    networkData.DICE,
  ];
  const tokenSmallUnit = 10000 * 10 ** 6;
  for (let i = 0; i < addresses.length; i++) {
    console.log(`Sending tokens to ${addresses[i]}...`);
    await fakeToken.mint(addresses[i], tokenSmallUnit);
  }
  exit();
};
