import React from 'react';
import { Text } from '@/components/Text';
import { classname } from '@/utils/string';

type ButtonSize = 'lg' | 'sm'

type ButtonProps = {
  icon?: React.ReactNode;
  size?: ButtonSize;
  block?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  icon,
  size = 'lg',
  block = false,
  className,
  children,
  ...props
}) =>
  <button
    className={
      classname(
        'border',
        'border-solid',
        'border-blue',
        'bg-blue',
        'select-none',
        block && 'block w-full',
        size === 'sm' ? 'rounded-md' : 'rounded-lg',
        className
      )
    }
    {...props}
  >
    <div
      className={
        classname(
          'flex',
          'items-center',
          'justify-center',
          'px-4',
          size === 'sm' ? 'h-7' : 'h-11'
        )
      }
    >
      {
        icon &&
        <div
          className={
            classname(
              size === 'sm' ? 'w-4' : 'w-6',
              size === 'sm' ? 'h-4' : 'h-6',
              size === 'sm' ? 'mr-1' : 'mr-2',
            )
          }
        >
          { icon }
        </div>
      }
      <Text
        type={size === 'sm' ? 'subhead' : 'headline'}
        color={'white'}
        align={'center'}
        strong
      >
        { children }
      </Text>
    </div>
  </button>;
