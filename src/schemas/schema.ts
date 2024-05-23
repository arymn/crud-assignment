import { z } from "zod";

export const CreateItemSchema = z.object({
  albumId: z.string(),
  title: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
});


export const UpdateItemSchema = z.object({
  albumId: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
  thumbnailUrl: z.string().optional(),
});
