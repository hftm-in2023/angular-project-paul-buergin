// src/app/app.routes.ts
import { Routes } from '@angular/router';
// Entfernen Sie hier explizite Imports von BlogListComponent und BlogDetailComponent,
// da sie jetzt Lazy Loaded werden.

export const routes: Routes = [
  { path: '', redirectTo: 'blog-list', pathMatch: 'full' }, // Standardumleitung zur Blog-Liste
  {
    path: 'blog-list',
    // LAZY LOADING der BlogListComponent
    // Der Code für BlogListComponent wird erst heruntergeladen, wenn diese Route aktiviert wird.
    loadComponent: () => import('./blog-list/blog-list.component').then(c => c.BlogListComponent)
  },
  {
    path: 'detail/:id', // `:id` ist ein Platzhalter für die Blog-ID
    // LAZY LOADING der BlogDetailComponent
    // Der Code für BlogDetailComponent wird erst heruntergeladen, wenn diese Route aktiviert wird.
    loadComponent: () => import('./blog-detail/blog-detail.component').then(c => c.BlogDetailComponent)
  },
  { path: '**', redirectTo: 'blog-list' } // Wildcard-Route: Leitet unbekannte Pfade zur Blog-Liste um
];