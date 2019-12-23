const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.js'),
    autoprefixer,
    ...process.env.NODE_ENV === 'production' ? [
      purgecss({
      content: ['./src/**/*.tsx'],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
    ] : [],
  ],
};
