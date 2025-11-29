module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka"', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        accent: '#2563eb'
      }
    }
  },
  safelist: [
    'bg-gradient-to-r',
    'from-sky-400',
    'to-blue-400',
    'text-white',
    'font-extrabold',
    'text-white/95',
    'bg-accent'
  ],
  plugins: []
}
