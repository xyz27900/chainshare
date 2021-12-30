import { colors } from '@/vars/colors';
import { fonts } from '@/vars/fonts';

export type Color = keyof KebabKeys<typeof colors>;
export type Font = keyof KebabKeys<typeof fonts>;
