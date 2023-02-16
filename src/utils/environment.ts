import * as z from "zod";

console.log(import.meta.env);
const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  VITE_WEBSOCKET_SERVER: z.string().url(),
});

const environment = environmentSchema.parse(import.meta.env);

export { environment };
