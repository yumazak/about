import { defineConfig } from "astro/config";

const base = process.env.BASE_PATH || "/";
const site = process.env.SITE || "https://yumazak.github.io";

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "ignore",
});
