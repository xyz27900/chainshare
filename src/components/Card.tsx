import React from 'react';
import { Text } from '@/components/Text';
import { classname } from '@/utils/string';

type CardProps = {
  header?: React.ReactNode;
  label?: string;
  title?: string;
  description?: React.ReactNode | string;
  align?: 'left' | 'center' | 'right';
  size?: 'md' | 'lg';
  truncate?: boolean;
  compact?: boolean;
}

export const Card: React.FC<CardProps> = ({
  header,
  label,
  title,
  description,
  align = 'left',
  size = 'lg',
  truncate = false,
  compact = false,
  children,
}) => {
  const hasLabel = label && label.length > 0;
  const hasTitle = title && title.length > 0;
  const hasDescription = description && (typeof description === 'string' ? description.length > 0 : true);

  return <div className={!compact ? size === 'lg' ? 'w-96' : 'w-72' : ''}>
    {
      hasLabel &&
      <div className="mb-1 px-4 select-none">
        <Text type={'footnote'} color={'label-secondary'}>{ label.toUpperCase() }</Text>
      </div>
    }
    <div
      className={
        classname(
          'flex',
          'flex-col',
          'max-w-full',
          'border',
          'border-solid',
          'border-separator',
          'rounded-lg',
          'bg-white',
          'overflow-hidden',
          !compact && 'p-8',
        )
      }>
      { header && <div className="flex flex-col items-center mb-3">{ header }</div> }
      {
        (hasTitle || hasDescription) &&
        <div className={classname(!!children && 'mb-3')}>
          {
            hasTitle &&
            <div>
              <Text
                type={'headline'}
                align={align}
                strong
                truncate={false}
              >
                { title }
              </Text>
            </div>
          }
          {
            hasDescription &&
            <div className="mt-1">
              <Text
                type={'footnote'}
                color={'label-secondary'}
                align={align}
                truncate={truncate}
              >
                { description }
              </Text>
            </div>
          }
        </div>
      }
      { children }
    </div>
  </div>;
};
