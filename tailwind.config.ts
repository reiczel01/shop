import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#afffb5",

          secondary: "#b2c0ff",

          accent: "#eda6ce",

          neutral: "#17161d",

          "base-100": "#2b2f3b",

          info: "#5b7df5",

          success: "#7be5c9",

          warning: "#b68a07",

          error: "#f72008",
          body:{
            "background-color":"#2D2E2E",
          }
        },
      },
    ],
  },
};
export default config;
