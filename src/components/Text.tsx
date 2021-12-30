import React from 'react';
import { classname } from '@/utils/string';
import { Color } from '@/vars/colors';
import { Font } from '@/vars/fonts';

type TextProps = {
  type?: Font;
  color?: Color;
  align?: 'left' | 'center' | 'right';
  normal?: boolean;
  strong?: boolean;
  truncate?: boolean;
}

export const Text: React.FC<TextProps> = ({
  type = 'body',
  color= 'label-primary',
  align = 'left',
  normal = false,
  strong = false,
  truncate = true,
  children,
}) => {
  const fontWeight = (): 'light' | 'normal' | 'medium' =>
    strong
      ? 'medium'
      : normal
        ? 'normal'
        : 'light';

  return <span
    className={
      classname(
        'block',
        `font-${type}`,
        `font-${fontWeight()}`,
        `text-${align}`,
        `text-${color}`,
        truncate && 'truncate whitespace-nowrap',
      )
    }
  >
    { children }
  </span>;
};
