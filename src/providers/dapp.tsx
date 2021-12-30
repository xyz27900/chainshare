import { ethers } from 'ethers';
import { IPFSHTTPClient } from 'ipfs-http-client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMetamask } from 'use-metamask';
import { logout, setAccount, setChain, setPending, getAccount, setError } from '@/store/app';
import { Storage } from '@/typechain';
import storage from '../../artifacts/contracts/Storage.sol/Storage.json';

type Contract = {
  full: Storage | null;
  readonly: Storage | null;
}

type DApp = {
  contract: Contract;
  ipfs: IPFSHTTPClient | null;
  available: boolean;
  login: () => Promise<void>;
}

const initialState: DApp = {
  contract: {
    full: null,
    readonly: null,
  },
  ipfs: null,
  available: false,
  login: async () => console.warn('Login function is empty'),
};

const DAppContext = React.createContext<DApp>(initialState);

export const DAppProvider: React.FC = ({ children }) => {
  const metamask = useMetamask();
  const account = useSelector(getAccount);
  const dispatch = useDispatch();
  const [fullContract, setFullContract] = useState<Storage | null>(null);
  const [readonlyContract, setReadonlyContract] = useState<Storage | null>(null);

  const login = useCallback(async () => {
    dispatch(setPending(true));

    try {
      await metamask.connect(ethers.providers.Web3Provider);
      window.localStorage.setItem('CHAINSHARE', 'true');
    } catch (e) {
      dispatch(setError(true));
    } finally {
      dispatch(setPending(false));
    }
  }, []);

  useEffect(() => {
    /* Logout if metamask disconnected from page */
    if (!metamask.metaState.isConnected) {
      dispatch(logout());
    }
  }, [metamask.metaState.isConnected]);

  useEffect(() => {
    const { account: metamaskAccount } = metamask.metaState;
    if (metamaskAccount.length > 0) {
      dispatch(setAccount(metamaskAccount[0]));
    }
  }, [metamask.metaState.account]);

  useEffect(() => {
    const { chain } = metamask.metaState;
    if (chain.id && chain.name.length > 0) {
      dispatch(setChain({ id: chain.id, name: chain.name }));
    }
  }, [metamask.metaState.chain]);

  useEffect(() => {
    /* Reset R/W contract if logout */
    if (!account) {
      setFullContract(null);
      return;
    }

    const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
    const contract = new ethers.Contract(__CONTRACT_ADDRESS__, storage.abi, signer);
    setFullContract(contract as unknown as Storage);
  }, [account]);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(__NETWORK_URL__);
    const contract = new ethers.Contract(__CONTRACT_ADDRESS__, storage.abi, provider);
    setReadonlyContract(contract as unknown as Storage);
  }, []);

  return <DAppContext.Provider
    value={{
      contract: {
        full: fullContract,
        readonly: readonlyContract,
      },
      ipfs: window.IpfsHttpClient.create({ url: 'https://ipfs.infura.io:5001' }),
      available: window.localStorage.getItem('CHAINSHARE') === 'true',
      login,
    }}
  >
    { children }
  </DAppContext.Provider>;
};

export const useDApp = (): DApp => {
  return useContext(DAppContext);
};
