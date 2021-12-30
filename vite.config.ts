import path from 'path';
import pluginReact from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import pluginReactSvg from 'vite-plugin-react-svg';
import { development, mainnet, ropsten } from './networks.config';

dotenv.config();

const network = process.env.NETWORK === 'mainnet'
  ? mainnet
  : process.env.NETWORK === 'ropsten'
    ? ropsten
    : development;

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginReactSvg({ defaultExport: 'component' }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  define: {
    __CHAIN_ID__: `'${network.chainId}'`,
    __NETWORK_URL__: `'${network.url}'`,
    __CONTRACT_ADDRESS__: `'${process.env.CONTRACT_ADDRESS}'`,
  },
});
