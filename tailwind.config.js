const twTheme = require('./themes/hugoplate/assets/tailwind-plugin/tw-theme.js');
const twGrid = require('./themes/hugoplate/assets/tailwind-plugin/tw-bs-grid.js');

module.exports = {
  content: [
    './layouts/**/*.{html,js}',
    './content/**/*.{md,html}',
    './themes/**/*.{html,js}'
  ],
  theme: {
    extend: {
      colors: {
        light: '#f9fafb',
        dark: '#0f172a',
      }
    }
  },
  plugins: [
    twTheme,
    twGrid,
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
