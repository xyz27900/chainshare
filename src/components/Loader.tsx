import React from 'react';
import IconSpinner from '@/assets/spinner.svg';
import { Icon } from '@/components/Icon';

export const Loader: React.FC = () =>
  <div className="h-full flex flex-col justify-center items-center">
    <Icon color={'blue'} className="w-16 h-16 animate-spin">
      <IconSpinner />
    </Icon>
  </div>;
