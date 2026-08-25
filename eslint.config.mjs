import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Flags the standard Next.js client-hydration guard
      // (useEffect(() => setMounted(true), [])) used to avoid a
      // server/client mismatch — a real, correct pattern here, not a bug.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Cloudflare/OpenNext build output and local dev state — generated,
    // not source. Missing from here meant `npm run lint` was scanning
    // ~11,700 lines of generated code as if it were source.
    ".open-next/**",
    ".wrangler/**",
  ]),
]);

export default eslintConfig;
