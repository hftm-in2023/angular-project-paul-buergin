// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // <-- Diesen Import HINZUFÜGEN
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // <-- Diesen Aufruf HINZUFÜGEN
    provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));