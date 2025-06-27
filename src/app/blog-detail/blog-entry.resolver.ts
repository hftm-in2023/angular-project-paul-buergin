// src/app/blog-detail/blog-entry.resolver.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'; // 'map' ist hier nicht notwendig, wenn Sie direkt BlogEntry erwarten

interface BlogEntry {
  // ... (Ihr korrektes Interface hier) ...
  id: number;
  title: string;
  author: string;
  publishDate: string;
  content: string;
  comments: any[];
  createdAt: string;
  createdByMe: boolean;
  likedByMe: boolean;
  likes: number;
  updatedAt: string;
}

export const blogEntryResolver: ResolveFn<BlogEntry | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<BlogEntry | null> => {
  const http = inject(HttpClient);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  if (!id) {
    console.warn('Resolver: Keine ID in den Routenparametern gefunden. Weiterleitung zur Blog-Liste.');
    router.navigate(['/blog-list']); // Oder zu einer 404 Seite
    return of(null); // Beendet den Resolver-Fluss
  }

  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    console.error('Resolver: Ungültige ID für Blog-Eintrag:', id);
    router.navigate(['/blog-list']); // Oder zu einer 404 Seite
    return of(null); // Beendet den Resolver-Fluss
  }

  return http.get<BlogEntry>(`/api/entries/${numericId}`).pipe(
    catchError(error => {
      // Wenn der API-Aufruf fehlschlägt (z.B. 404, Netzwerkfehler)
      console.error('Resolver: Fehler beim Laden des Blog-Eintrags:', error);
      // Hier können Sie entscheiden:
      // a) Zur Blog-Liste oder Fehlerseite umleiten:
      router.navigate(['/blog-list']); // ODER ['/error', { message: 'Blog nicht gefunden' }]
      return of(null); // Beendet den Resolver-Fluss und verhindert, dass die Komponente geladen wird.
      // b) Die Komponente trotzdem laden, aber mit null-Daten, damit sie die Fehlermeldung anzeigt:
      // return of(null); // Entfernen Sie dann das router.navigate hier.
    })
  );
};