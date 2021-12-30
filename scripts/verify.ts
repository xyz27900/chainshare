import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { run } from 'hardhat';

const main = async (): Promise<void> => {
  const envFile = path.resolve(process.cwd(), '.env');
  const envData = fs.readFileSync(envFile);
  const { CONTRACT_ADDRESS } = dotenv.parse(envData);

  await run('verify:verify', {
    address: CONTRACT_ADDRESS,
  });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
