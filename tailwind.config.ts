import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent:  "#C8F135",
        "hm-black": "#0A0A0A",
      },
      fontFamily: {
        sans: ["DM Sans", "Helvetica Neue", "sans-serif"],
      },
      maxWidth: {
        mobile: "430px",
      },
    },
  },
  plugins: [],
};

export default config;
