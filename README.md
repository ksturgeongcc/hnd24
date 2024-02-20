# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

# npm install tailwindcss postcss autoprefixer
# npx tailwindcss init -p
#### if not aready ther add the following to postcss.config
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

# /* src/index.css */

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

# tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


# npm install react-router-dom