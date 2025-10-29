import { nodeFileTrace } from "@vercel/nft";
import path from "path";

const drizzle = nodeFileTrace([
  require.resolve("drizzle-kit"),
  require.resolve("drizzle-orm"),
  path.resolve(path.dirname(require.resolve("drizzle-kit")), "bin.cjs"),
]).then((drizzle) => [
  ...drizzle.fileList,
  "./node_modules/.bin/drizzle-kit",
  "./node_modules/drizzle-orm/**",
  "./node_modules/drizzle-kit/**",
]);

const config = Promise.resolve(drizzle).then((drizzle) => ({
  images: {
    unoptimized: true,
  },
  output: "standalone",
  outputFileTracingIncludes: {
    "**": [...drizzle],
    "/": ["./db/**/*"],
  },
}));

export default config;
