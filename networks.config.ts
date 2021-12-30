import dotenv from 'dotenv';
import { HttpNetworkUserConfig } from 'hardhat/types';

dotenv.config();

export const mainnet: HttpNetworkUserConfig = {
  chainId: 1,
  url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  accounts: [process.env.ACCOUNT ?? ''],
};

export const ropsten: HttpNetworkUserConfig = {
  chainId: 3,
  url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  accounts: [process.env.ACCOUNT ?? ''],
};

export const development: HttpNetworkUserConfig = {
  chainId: 1337,
  url: 'http://127.0.0.1:7545',
  accounts: [process.env.ACCOUNT ?? ''],
};
