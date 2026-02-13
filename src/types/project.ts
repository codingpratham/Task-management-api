import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  deadline: z.string().transform((str) => new Date(str)),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export type projectType = z.infer<typeof projectSchema>;
