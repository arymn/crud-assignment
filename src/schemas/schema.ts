import { z } from "zod";

export const CreateItemSchema = z.object({
  albumId: z.string(),
  title: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
});
