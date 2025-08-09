import { z } from 'zod';
import { blogsSchema } from './blog.schema'; // Importiert das Schema für das Blog-Array

// Definiert die Validierungsregeln für das gesamte Backend-Antwortobjekt.
export const backendResponseSchema = z.object({
  data: blogsSchema, // Die Eigenschaft 'data' muss ein Array von validen Blogs sein.
  maxPageSize: z.number(),
  pageIndex: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
});

// Leitet den TypeScript-Typ direkt vom Schema ab.
export type BackendResponse = z.infer<typeof backendResponseSchema>;
