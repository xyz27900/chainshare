import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { ethers } from 'hardhat';

dotenv.config();

const main = async (): Promise<void> => {
  const gasMultiplier = Number(process.env.GAS_MULTIPLIER ?? 1) * 10;
  const currentGasPrice = await ethers.provider.getGasPrice();
  const gasPrice = currentGasPrice
    .mul(10)
    .mul(BigInt(gasMultiplier))
    .div(BigInt(10));

  const storageContract = await ethers.getContractFactory('Storage');
  const storage = await storageContract.deploy({ gasPrice });

  await storage.deployed();

  console.log('Storage deployed to:', storage.address);

  const envFile = path.resolve(process.cwd(), '.env');

  const envData = fs.existsSync(envFile) ? fs.readFileSync(envFile) : '';
  const data = {
    ...dotenv.parse(envData),
    CONTRACT_ADDRESS: storage.address,
  };

  const formattedData = Object.entries(data).map(([key, value]) => `${key}=${value}`);

  fs.writeFileSync(envFile, formattedData.join('\n'));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
