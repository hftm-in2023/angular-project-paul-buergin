// src/app/app.routes.ts
import { Routes } from '@angular/router';
// Stellen Sie sicher, dass dieser Import den korrekten Pfad zu Ihrer Resolver-Datei hat!
// Beispiel: Wenn blog-entry.resolver.ts in src/app/blog-detail liegt
import { blogEntryResolver } from './blog-detail/blog-entry.resolver';


export const routes: Routes = [
  { path: '', redirectTo: 'blog-list', pathMatch: 'full' },
  {
    path: 'blog-list',
    loadComponent: () => import('./blog-list/blog-list.container').then(c => c.BlogListContainer)
  },
  {
    path: 'detail/:id',
    // lazy loading der Komponente bleibt
    loadComponent: () => import('./blog-detail/blog-detail.container').then(c => c.BlogDetailContainer),
    // HIER ist der ENTSCHEIDENDE TEIL für den Resolver!
    resolve: {
      blogEntry: blogEntryResolver // <--- Dieser Eintrag muss hier sein!
    }
  },
  { path: '**', redirectTo: 'blog-list' }
];