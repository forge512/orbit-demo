module.exports = {
  purge: {
    enabled: process.env.EMBER_ENV === 'production',
    content: [
      './app/index.html',
      './app/templates/**/*.hbs',
      './app/components/**/*.hbs',
    ],
  },
  theme: {},
  variants: {},
  plugins: [require('@tailwindcss/forms')],
};
