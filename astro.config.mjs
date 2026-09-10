import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";

export default defineConfig({
  integrations: [react(), {
    name: "build-csp-hashes",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const hashes = new Set();
        for (const file of await readdir(dir, { recursive: true })) {
          if (!file.endsWith(".html")) continue;
          const html = await readFile(new URL(file.replaceAll("\\", "/"), dir), "utf8");
          for (const [, attributes, script] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
            if (/\bsrc\s*=/i.test(attributes) || /\btype\s*=\s*["']application\/ld\+json["']/i.test(attributes)) continue;
            hashes.add(`'sha256-${createHash("sha256").update(script).digest("base64")}'`);
          }
        }
        const headersUrl = new URL("_headers", dir);
        const headers = await readFile(headersUrl, "utf8");
        await writeFile(headersUrl, headers.replace(
          /script-src ([^;]+);/,
          (_, sources) => `script-src ${sources} ${[...hashes].sort().join(" ")};`,
        ));
      },
    },
  }],
  vite: {
    plugins: [tailwindcss()],
  },
});
