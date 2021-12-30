import { kebabCase } from '@/utils/string';
import { fonts } from '@/vars/fonts';

export const makeFonts = (): string => {
  const entries = Object.entries(fonts);

  const styles = entries.map(([name]) => {
    const displayName = kebabCase(name);
    const fontSize = `\tfont-size: var(--${displayName}-font-size);`;
    const lineHeight = `\tline-height: var(--${displayName}-line-height);`;
    return [`.font-${displayName} {`, fontSize, lineHeight, '}'].join('\n');
  });

  const variables = entries.map(([name, value]) => {
    const displayName = kebabCase(name);
    const fontSize = `\t--${displayName}-font-size: ${value.size}px;`;
    const lineHeight = `\t--${displayName}-line-height: ${value.lineHeight}px;`;
    return [fontSize, lineHeight].join('\n');
  });

  const variablesCss = [':root {', ...variables, '}'].join('\n');
  const stylesCss = styles.join('\n\n');

  return [variablesCss, stylesCss].join('\n\n') + '\n';
};
