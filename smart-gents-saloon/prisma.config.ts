import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // This forces the Prisma compiler to output a precise load error if it cannot read .env
    url: env("DATABASE_URL"),
  },
});
