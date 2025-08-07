import { Blog } from './blog.model';

// Beschreibt die Struktur der gesamten API-Antwort für die Listenansicht
export interface BackendResponse {
  data: Blog[];
  maxPageSize: number;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}