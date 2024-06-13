module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/utils/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        topColor: "#F9F9F9",
        bottomColor: "#EFEFEF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@material-tailwind/react")],
  safelist: [
    {
      pattern: /bg-(blue|green|yellow|red|purple|teal|pink|indigo|cyan|lime|amber|gray|orange|stone|slate|neutral|zinc)-50/,
    },
    {
      pattern: /text-(blue|green|yellow|red|purple|teal|pink|indigo|cyan|lime|amber|gray|orange|stone|slate|neutral|zinc)-600/,
    },
  ],
};
