import * as z from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  VITE_WEBSOCKET_SERVER: z.string().url(),
  VITE_CONTRACT_ADDRESS: z.string().length(42),
});

const environment = environmentSchema.parse(import.meta.env);

export { environment };
