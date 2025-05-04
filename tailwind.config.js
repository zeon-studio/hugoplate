const twTheme = require('./tailwind-plugin/tw-theme');
const twGrid = require('./tailwind-plugin/tw-bs-grid');

module.exports = {
  content: [
    './layouts/**/*.{html,js}',
    './content/**/*.{md,html}',
    './themes/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        light: '#f9fafb', // 💡 додаємо light вручну
        dark: '#111827',  // і можна ще dark, якщо треба
      },
    },
  },
  plugins: [
    twTheme,
    twGrid,
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
