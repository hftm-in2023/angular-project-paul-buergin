// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component'; // <<< NEUE Komponente importieren
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

export const routes: Routes = [
  { path: '', component: BlogListComponent, title: 'Blog-Übersicht' }, // Home-Route zur BlogListComponent
  { path: 'detail/:id', component: BlogDetailComponent, title: 'Blog-Details' },
  { path: '**', redirectTo: '' } // Fallback für unbekannte Routen
];