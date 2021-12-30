export const capitalize = (str: string): string => {
  return str.replace(str[0], str[0].toUpperCase());
};

export const ellipsisAddress = (address: string): string => {
  return address.slice(0, 5) + '...' + address.slice(-4);
};

export const classname = (...items: (string | boolean | undefined)[]): string => {
  return items.filter(item => !!item).join(' ');
};

export const kebabCase = (string: string): string => {
  return string.split('').map((char, idx) => {
    return char.toUpperCase() === char
      ? `${idx !== 0 ? '-' : ''}${char.toLowerCase()}`
      : char;
  }).join('');
};
