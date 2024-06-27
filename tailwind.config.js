/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./app/components/*.tsx",
    // ↑ app/components/CoordinateCard.tsx, app/components/CoordinateList.tsx を読み込むための設定です。
    // ↓ では読み込めなかった。
    "./app/components/**/*.{tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

