// @ts-check

import fs from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const aurora = JSON.parse(fs.readFileSync("src/assets/themes/aurora.json", "utf8"));

export default defineConfig({
  devToolbar: {
    enabled: false,
  },

  integrations: [
    mdx(),
    sitemap({
      lastmod: new Date(),
    }),
  ],

  markdown: {
    shikiConfig: {
      theme: aurora,
      wrap: false,
    },
  },

  server: {
    host: "localhost",
    port: 3000,
  },

  site: "https://rokimiftah.id",

  trailingSlash: "never",

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["dev.rokimiftah.id"],
    },
  },
});
