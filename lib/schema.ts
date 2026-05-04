import { z } from "zod";

/**
 * Shared Schema for User Validation
 * This can be used on both Client (Forms) and Server (Actions/API)
 */
export const UserSchema = z.object({
  username: z.string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Hanya boleh huruf, angka, dan underscore"),
  
  email: z.string()
    .email("Format email tidak valid"),
  
  age: z.number({
    error: (iss) => {
      if (iss.code === "invalid_type") {
        if (iss.input === undefined) return "Usia wajib diisi";
        return "Usia harus berupa angka";
      }
      return iss.message;
    }
  }).min(18, "Minimal usia adalah 18 tahun"),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Shared Schema for Post Validation
 */
export const PostSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  published: z.boolean().default(false),
});

export type Post = z.infer<typeof PostSchema>;
