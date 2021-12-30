import { kebabCase } from '@/utils/string';
import { colors } from '@/vars/colors';

export const makeColors = (): string => {
  const entries = Object.entries(colors);

  const variables = entries.map(([name, value]) => {
    return `--color-${kebabCase(name)}: ${value};`;
  });

  return [':root {', ...variables.map(item => `\t${item}`), '}'].join('\n') + '\n';
};
