import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('https://s3-alpha-sig.figma.com/img/caf5/016f/97f154adfd88d0e48d9a7fc87e5ab035?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YKFT1pH7jc~vfigaOM6LA5TsF8Jx2DnThyDOxr~-0kIkaUSdQYERDUs4IW7GOcI87ZgxZbjSpRzmg0ZqEtQngMWq-hjOM~zV3o2L-uCzKO23l6O3U7OTpBZHLr-oy1tZAspVdHceVuToOx10gkKjnHFYygcskVNodkZDGtH2WNCZJ~6b7gwTpYd~nhZ3s7lcyEzcS6EFHxvfFCs6uAXMf0oCwh4XdfBztkjtEu4q-jAFFYyZoIiRc1ByUOWquvfh~KFrBy-dvViTf~dp0ugW~jKdNVqB58SDXaCZekvMqfdwvOGV8MP7ReMABS7XXZGIkfULQESwOtevsH1AnK5Myg__')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
