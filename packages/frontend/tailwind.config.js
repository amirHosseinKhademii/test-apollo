module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6EC5E9',
        secondary: '#003A6F',
        danger: '#FF5959',
        warning: '#FFC56C',
        fade: '#F2F1F1',
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
        bounce800: 'bounce 2s infinite 600ms',
        pulse200: 'pulse 1s linear infinite 20ms',
      },
      boxShadow: {
        blue: '0 5px 5px -3px rgba(0, 0, 50, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionProperty: {
        width: 'width',
        spacing: 'padding',
        position: 'position',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(+100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(+100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'fade-out-down': 'fade-out-down 0.4s ease-in-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-in-right-fast': 'fade-in-right 0.1s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
