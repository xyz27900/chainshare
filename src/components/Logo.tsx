import React from 'react';
import IconEthereum from '@/assets/ethereum.svg';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';

export const Logo: React.FC = () =>
  <div className="flex items-center select-none">
    <Icon color={'blue'} className="w-4 h-4 mr-1">
      <IconEthereum />
    </Icon>
    <Text type={'headline'} color={'blue'} normal>ChainShare</Text>
  </div>;
