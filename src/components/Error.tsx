import React from 'react';
import IconWarning from '@/assets/warning.svg';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';

export const Error: React.FC = () => {
  const reload = (): void => {
    window.location.reload();
  };

  return <div className="h-full flex flex-col justify-center items-center">
    <div className="flex flex-col items-center">
      <Card
        header={
          <Icon color={'red'} className="w-16 h-16">
            <IconWarning/>
          </Icon>
        }
        title={'An error occurred with MetaMask'}
        description={'Reload the page and try again'}
        align={'center'}
      >
        <Button onClick={reload}>Reload</Button>
      </Card>
    </div>
  </div>;
};
