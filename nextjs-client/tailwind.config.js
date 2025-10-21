/** @type {import('tailwindcss').Config} */
module.exports = {
        content: [
            "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Path to your App Router files
            "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Path to your components
            // Add other paths if you have them, like "./src/pages/**/*.{js,ts,jsx,tsx,mdx}" for the Pages Router
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // We'll use CSS variables from the dark theme
        },
      },
    },
    plugins: [],
  }