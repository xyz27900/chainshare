import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconCopy from '@/assets/copy.svg';
import IconCross from '@/assets/cross.svg';
import IconGlobe from '@/assets/globe.svg';
import IconSpinner from '@/assets/spinner.svg';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { Text } from '@/components/Text';
import { useDApp } from '@/providers/dapp';
import { useNotifications } from '@/providers/notifications';
import { getAccount, getPending, getNetwork, getLoggedIn } from '@/store/app';
import { ellipsisAddress, capitalize, classname } from '@/utils/string';

export const Navbar: React.FC = () => {
  const { notify } = useNotifications();
  const { login } = useDApp();
  const pending = useSelector(getPending);
  const account = useSelector(getAccount);
  const network = useSelector(getNetwork);
  const loggedIn = useSelector(getLoggedIn);
  const accountDisplay = account ? ellipsisAddress(account) : '';
  const validNetwork = network?.id === __CHAIN_ID__;

  const copyAddress = async (): Promise<void> => {
    if (!account) {
      return;
    }

    try {
      await window.navigator.clipboard.writeText(account);
      notify('Address copied', 'success');
    } catch (e) {
      notify('Can not copy address', 'error');
    }
  };

  return <div className="flex items-center bg-white border-0 border-b border-solid border-separator h-14">
    <Container>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to={'/'}>
            <Logo />
          </Link>
          {
            loggedIn && network &&
            <div
              className={
                classname(
                  'flex',
                  'items-center',
                  'ml-4',
                  'py-1',
                  'px-2',
                  'rounded',
                  'select-none',
                  validNetwork ? 'bg-gray-6' : 'bg-red'
                )
              }
              title={validNetwork ? '' : 'Incompatible network'}
            >
              <Icon color={validNetwork ? 'label-primary' : 'white'} className="h-4 w-4 mr-1.5">
                { validNetwork ? <IconGlobe /> : <IconCross /> }
              </Icon>
              <Text
                color={validNetwork ? 'label-primary' : 'white'}
                type={'footnote'}
                normal
              >
                { capitalize(network.name) } ({ network.id })
              </Text>
            </div>
          }
        </div>
        {
          loggedIn && account ?
            <div className="flex items-center">
              <div className="flex items-center select-none">
                <Text normal>{ accountDisplay }</Text>
                <Icon
                  className="w-4 h-4 ml-2 cursor-pointer text-label-secondary hover:text-label-primary"
                  onClick={copyAddress}
                >
                  <IconCopy />
                </Icon>
              </div>
            </div> :
            <Button
              className="w-20 px-0"
              disabled={pending}
              size={'sm'}
              onClick={login}
            >
              {
                pending ?
                  <Icon color={'white'} className="w-4 h-4 animate-spin">
                    <IconSpinner />
                  </Icon> :
                  'Login'
              }
            </Button>
        }
      </div>
    </Container>
  </div>;
};
