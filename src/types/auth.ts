import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["employee", "admin", "super_admin"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const onboardingSchema = z.object({
  name: z.string(),
  phone: z.string().min(10),
  address: z.string(),
  image: z.string(),
  isVerified: z.boolean().default(false),
});

export type registerType = z.infer<typeof registerSchema>;
export type loginType = z.infer<typeof loginSchema>;
export type onboardingType = z.infer<typeof onboardingSchema>;
