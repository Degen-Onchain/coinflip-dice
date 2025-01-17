const fs = require("fs-extra");
const path = require("path");
const CoinFlip = artifacts.require("games/CoinFlipGameSupra");
const FakeUSDCToken = artifacts.require("utils/FakeUSDCToken");
const GamesHub = artifacts.require("GamesHub");

module.exports = async function (deployer, network, accounts) {
  // Read contracts.json
  const variablesPath = path.join(__dirname, "..", "contracts.json");
  const data = JSON.parse(fs.readFileSync(variablesPath, "utf8"));
  const networkData = data[network];

  /// Initiate GamesHub an token
  const gamesHub = await GamesHub.at(networkData.GAMES_HUB);
  console.log(`GamesHub loaded at ${gamesHub.address}`);

  const fakeToken = await FakeUSDCToken.at(networkData.TOKEN_ADDRESS);

  /// Deploy CoinFlip
  let coinFlip;
  let name;

  if (networkData.COIN_FLIP === "") {
    console.log(`Deploying CoinFlip...`);

    name = "COIN_FLIP_SUPRA";

    await deployer.deploy(
      CoinFlip,
      networkData.VRF.Router,
      networkData.VRF.confirmations,
      gamesHub.address
    );

    coinFlip = await CoinFlip.deployed();
    console.log(`CoinFlip deployed at ${coinFlip.address}`);

    networkData.COIN_FLIP = coinFlip.address;
    fs.writeFileSync(variablesPath, JSON.stringify(data, null, 2));

    //wait 5 seconds
    await new Promise((r) => setTimeout(r, 5000));

    console.log(`Setting CoinFlip address to GamesHub...`);
    await gamesHub.setGameContact(
      coinFlip.address,
      web3.utils.sha3(name),
      false
    );

    console.log(`Minting 10000 tokens to CoinFlip...`);
    const tokenSmallUnit = 10000 * 10 ** 6;
    await fakeToken.mint(coinFlip.address, tokenSmallUnit);
  } else {
    console.log(`CoinFlip already deployed at ${networkData.COIN_FLIP}`);
    // console.log(`Keccak COIN_FLIP: ${web3.utils.sha3("COIN_FLIP_SUPRA")}`);
  }
};
