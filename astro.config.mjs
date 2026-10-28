import { defineConfig } from "astro/config";

import react from "@astrojs/react";

export default defineConfig({
  site: "https://yumazak.dev",
  output: "static",
  trailingSlash: "ignore",
  integrations: [react()],
});
