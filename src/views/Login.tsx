import React from 'react';
import { useSelector } from 'react-redux';
import MetamaskLogo from '@/assets/metamask.svg';
import IconSpinner from '@/assets/spinner.svg';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { useDApp } from '@/providers/dapp';
import { getPending } from '@/store/app';

export const Login: React.FC = () => {
  const pending = useSelector(getPending);
  const dApp = useDApp();

  const login = async (): Promise<void> => {
    try {
      await dApp.login();
    } finally {}
  };

  return <AppLayout>
    <div className="flex flex-col flex-grow justify-center items-center">
      <Card
        header={
          <div className="w-48 h-48">
            <MetamaskLogo />
          </div>
        }
        title={'Login to ChainShare using MetaMask'}
        description={
          <React.Fragment>
            If you don't know what is MetaMask and how to use it,&nbsp;
            <a
              className="text-blue hover:underline"
              href="https://metamask.io/"
              target="_blank"
            >
              visit website
            </a>
          </React.Fragment>
        }
      >
        <Button
          disabled={pending}
          block
          onClick={login}
        >
          {
            pending ?
              <Icon color={'white'} className="w-6 h-6 animate-spin">
                <IconSpinner />
              </Icon> :
              'Login'
          }
        </Button>
      </Card>
    </div>
  </AppLayout>;
};
