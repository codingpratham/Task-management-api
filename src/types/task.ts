import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  deadline: z.string().transform((str) => new Date(str)),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
  projectId: z.string(),
  userId: z.string(), // Employee assigned to the task
});

export type taskType = z.infer<typeof taskSchema>;
