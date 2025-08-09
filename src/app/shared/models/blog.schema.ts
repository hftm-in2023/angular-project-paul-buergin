import { z } from 'zod';

// Definiert die Validierungsregeln für ein einzelnes Blog-Objekt.
export const blogSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1, { message: "Titel darf nicht leer sein." }),
  author: z.string().min(1, { message: "Autor darf nicht leer sein." }),
  publishDate: z.string().datetime({ message: "Ungültiges Datumsformat." }),
  content: z.string(),
  comments: z.array(z.any()),
  createdAt: z.string().datetime(),
  createdByMe: z.boolean(),
  likedByMe: z.boolean(),
  likes: z.number().int().nonnegative(),
  updatedAt: z.string().datetime(),
});

// Leitet den TypeScript-Typ direkt vom Schema ab.
// Du brauchst jetzt keine manuelle "interface Blog" mehr.
export type Blog = z.infer<typeof blogSchema>;

// Ein zusätzliches Schema für ein ganzes Array von Blogs
export const blogsSchema = z.array(blogSchema);
