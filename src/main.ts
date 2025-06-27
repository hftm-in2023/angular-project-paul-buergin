// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ErrorHandler } from '@angular/core'; // <<< Import ErrorHandler
import { GlobalErrorHandler } from './app/core/global-error-handler'; // <<< Importieren Sie Ihren ErrorHandler

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    // <<< HIER IHREN GLOBALEN ERROR HANDLER REGISTRIEREN >>>
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
  .catch((err) => console.error(err));