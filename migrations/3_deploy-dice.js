const fs = require("fs-extra");
const path = require("path");
const Dice = artifacts.require("games/DiceSupra");
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

  /// Deploy Dice
  let dice;
  let name;

  if (networkData.DICE === "") {
    console.log(`Deploying Dice...`);

    /// Set Dice Type
    name = "DICE_SUPRA";
    console.log(`Deploying DiceSupra...`);

    await deployer.deploy(
      Dice,
      networkData.VRF.Router,
      networkData.VRF.confirmations,
      gamesHub.address
    );

    dice = await Dice.deployed();
    console.log(`Dice deployed at ${dice.address}`);

    networkData.DICE = dice.address;
    fs.writeFileSync(variablesPath, JSON.stringify(data, null, 2));

    //wait 5 seconds
    await new Promise((r) => setTimeout(r, 5000));

    console.log(`Setting Dice address to GamesHub...`);
    await gamesHub.setGameContact(dice.address, web3.utils.sha3(name), false);

    console.log(`Minting 10000 tokens to Dice...`);
    const tokenSmallUnit = 10000 * 10 ** 6;
    await fakeToken.mint(dice.address, tokenSmallUnit);
  } else {
    console.log(`Dice already deployed at ${networkData.DICE}`);
  }
};
