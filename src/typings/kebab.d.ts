type Upper =
  'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' |
  'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' |
  '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';

type Kebab<T extends string> = T extends `${infer L}${Upper}${infer R}` ?
  T extends `${L}${infer U}${R}` ? `${L}-${Lowercase<U>}${Kebab<R>}` : T : T;

type KebabKeys<T> = { [K in keyof T as K extends string ? Kebab<K> : K]: T[K] };
