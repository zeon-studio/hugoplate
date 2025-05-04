const twTheme = require('./assets/tailwind-plugin/tw-theme.js')
const twGrid = require('./assets/tailwind-plugin/tw-bs-grid.js')

module.exports = {
  content: [
    './layouts/**/*.{html,js}',
    './content/**/*.{md,html}',
    './themes/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    twTheme,
    twGrid,
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
