// client/vite.config.ts

// import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";
import { createHtmlPlugin } from "vite-plugin-html";
import envCompatible from "vite-plugin-env-compatible";
// import basicSsl from "@vitejs/plugin-basic-ssl";

const ENV_PREFIX = "VITE_";

export default defineConfig(({ mode }) => {
  console.log("Mode is:", mode);
  // Then load env
  const env = loadEnv(mode, process.cwd(), "VITE_");
  console.log("Loaded env:", env);

  // const isHttps = env.VITE_SERVER_HTTPS === "true";
  const shouldOpen = env.VITE_SERVER_OPEN_BROWSER === "true";

  return {
    plugins: [
      react(),
      envCompatible({ prefix: ENV_PREFIX }),
      // basicSsl(),
      tsconfigPaths(),
      ...(process.env.HTTPS ? [mkcert()] : []),
      createHtmlPlugin({
        inject: {
          data: {
            env: {
              NODE_ENV: process.env.NODE_ENV,
              VITE_API_BASE_URL: env.VITE_API_BASE_URL,
              VITE_PUBLIC_PROJECT_ID: env.VITE_PUBLIC_PROJECT_ID,
            },
          },
        },
      }),
    ],
    publicDir: "./public",
    /* resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    }, */
    server: {
      host: true,
      port: 3000,
      open: shouldOpen,
      // https: isHttps,
    },
    build: {
      outDir: "build",
    },
  };
});
