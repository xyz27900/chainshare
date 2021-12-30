import React from 'react';
import { classname } from '@/utils/string';
import { Color } from '@/vars/colors';

type IconProps = {
  color?: Color;
} & React.HTMLAttributes<HTMLDivElement>;

export const Icon: React.FC<IconProps> = ({
  color,
  className,
  children,
  ...props
}) =>
  <div
    className={
      classname(
        'flex',
        'items-stretch',
        'justify-center',
        className,
        color && `text-${color}`,
      )
    }
    {...props}
  >
    {children}
  </div>;
