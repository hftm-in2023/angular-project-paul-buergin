import { z } from 'zod';

// Wir importieren das Blog-Array-Schema hier nicht mehr,
// da wir die Filterung manuell im Service durchführen.

export const backendResponseSchema = z.object({
  // Akzeptiert ein Array mit beliebigen Objekten, die wir dann einzeln prüfen.
  data: z.array(z.any()),
  maxPageSize: z.number(),
  pageIndex: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
});

export type BackendResponse = z.infer<typeof backendResponseSchema>;
