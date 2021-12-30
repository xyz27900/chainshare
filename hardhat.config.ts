import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import { mainnet, ropsten } from './networks.config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    hardhat: {},
    ropsten,
    mainnet,
  },
  gasReporter: {
    currency: 'ETH',
    gasPrice: 140,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'src/typechain',
    target: 'ethers-v5',
  },
};

export default config;
