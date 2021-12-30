/* eslint-disable quote-props */
module.exports = {
  mode: 'jit',
  preflight: false,
  content: [
    './index.html',
    './src/**/*.tsx',
  ],
  safelist: [
    { pattern: /text-*./ },
    { pattern: /font-*./ },
    { pattern: /bg-*./ },
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'label-primary': 'var(--color-label-primary)',
      'label-secondary': 'var(--color-label-secondary)',
      'separator': 'var(--color-separator)',
      'overlay': 'var(--color-overlay)',
      'black': 'var(--color-black)',
      'white': 'var(--color-white)',
      'red': 'var(--color-red)',
      'orange': 'var(--color-orange)',
      'yellow': 'var(--color-yellow)',
      'green': 'var(--color-green)',
      'blue': 'var(--color-blue)',
      'gray': 'var(--color-gray)',
      'gray-2': 'var(--color-gray-2)',
      'gray-6': 'var(--color-gray-6)',
    },
  },
};
