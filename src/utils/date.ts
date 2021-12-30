export const dateformat = (template: string, date: Date): string => {
  const specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
  return date.toISOString().split(/[-:.TZ]/).reduce((result, item, i) => {
    return result.split(specs[i]).join(item);
  }, template);
};
