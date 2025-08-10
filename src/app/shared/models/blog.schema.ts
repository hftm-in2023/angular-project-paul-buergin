import { z } from 'zod';

export const blogSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1, { message: "Titel darf nicht leer sein." }),

  //author: z.string(),
  author: z.string().email({ message: "Ungültige E-Mail-Adresse für den Autor." }),
  // HIER SIND DIE KORREKTUREN:
  
  // Erlaubt, dass 'comments' entweder ein Array oder eine Zahl ist (und optional sein kann).
  comments: z.union([z.array(z.any()), z.number()]).optional(),

  // Akzeptiert jeden beliebigen Text für die Datumsfelder, da das Format nicht ISO ist.
  createdAt: z.string(),
  updatedAt: z.string(),

  // Die anderen Felder bleiben wie besprochen.
  publishDate: z.string().datetime({ message: "Ungültiges Datumsformat." }).optional(),
  content: z.string().optional(),
  createdByMe: z.boolean(),
  likedByMe: z.boolean(),
  likes: z.number().int().nonnegative(),
});

export type Blog = z.infer<typeof blogSchema>;

export const blogsSchema = z.array(blogSchema);
