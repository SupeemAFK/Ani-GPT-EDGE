/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      keyframes: {
        // three bounce
        'three-bounce': {
          '0%, 100%': {
            transform: 'scale(0.5)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'scale(1.25)',
            opacity: '1',
          },
        },
      },
      animation: {
        //three-bounce
        'three-bounce': 'three-bounce 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}