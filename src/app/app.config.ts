import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

// 1. Die korrekten Funktionen für HttpClient und Interceptoren importieren
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/global-error-handler';
// 2. Deinen funktionalen Interceptor importieren
import { loggingInterceptor } from './core/interceptors/logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Stellt die Routen für die Anwendung bereit
    provideRouter(routes),

    // Stellt den HttpClient bereit und registriert den funktionalen Interceptor.
    // Jede HTTP-Anfrage wird jetzt automatisch durch den loggingInterceptor geleitet.
    provideHttpClient(
      withInterceptors([loggingInterceptor])
    ),

    // Registriert deinen globalen Error-Handler
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
