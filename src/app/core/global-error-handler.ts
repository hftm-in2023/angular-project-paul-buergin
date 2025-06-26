// src/app/core/error-handler/global-error-handler.ts
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../shared/services/notification.service'; // Pfad anpassen

@Injectable() // Da wir es über Angular's DI bereitstellen, ist Injectable notwendig
export class GlobalErrorHandler implements ErrorHandler {

  // Wir injizieren Injector, um eine Zirkelabhängigkeit zu vermeiden,
  // da NotificationService den GlobalErrorHandler nicht direkt injizieren sollte.
  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const notificationService = this.injector.get(NotificationService);
    // NgZone ist wichtig, um sicherzustellen, dass UI-Updates innerhalb von Angular's Zone erfolgen.
    // Fehler, die außerhalb der Zone auftreten, könnten sonst UI-Updates verhindern.
    const ngZone = this.injector.get(NgZone);

    let errorMessage: string;
    let userMessage: string = 'Ein unerwarteter Fehler ist aufgetreten.';

    // Fehler-Typen unterscheiden
    if (error instanceof HttpErrorResponse) {
      // Server- oder Netzwerfehler
      console.error('Globaler HTTP-Fehler:', error);

      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `Netzwerkfehler oder Client-Fehler: ${error.error.message}`;
        userMessage = 'Es gab ein Problem mit der Netzwerkverbindung oder ein Fehler in der Anwendung.';
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        errorMessage = `Backend-Fehler - Status: ${error.status}, Nachricht: ${error.message}`;

        if (error.status === 0) {
          userMessage = 'Der Server ist nicht erreichbar. Bitte versuchen Sie es später erneut.';
        } else if (error.status >= 500) {
          userMessage = 'Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
        } else if (error.status >= 400 && error.status < 500) {
          if (error.status === 404) {
            userMessage = 'Die angeforderte Ressource wurde nicht gefunden.';
          } else if (error.status === 401 || error.status === 403) {
            userMessage = 'Sie sind nicht berechtigt, diese Aktion auszuführen.';
            // Hier könnte man auch zu einer Login-Seite navigieren
            // const router = this.injector.get(Router);
            // router.navigate(['/login']);
          } else if (error.error && error.error.message) {
            // Wenn das Backend eine spezifische Fehlermeldung liefert
            userMessage = `Fehler: ${error.error.message}`;
          } else {
            userMessage = `Es gab ein Problem mit Ihrer Anfrage (Status: ${error.status}).`;
          }
        } else {
          userMessage = 'Ein unbekannter HTTP-Fehler ist aufgetreten.';
        }
      }
    } else if (error instanceof Error) {
      // Laufzeitfehler (z.B. TypeError, ReferenceError in der Anwendung)
      console.error('Globaler Laufzeitfehler:', error);
      errorMessage = `Anwendungsfehler: ${error.message}`;
      userMessage = 'Ein unerwarteter Anwendungsfehler ist aufgetreten. Bitte laden Sie die Seite neu.';
    } else {
      // Andere unbekannte Fehler
      console.error('Globaler unbekannter Fehler:', error);
      errorMessage = 'Unbekannter Fehler aufgetreten.';
      userMessage = 'Ein unbekannter Fehler ist aufgetreten.';
    }

    // Loggen des Fehlers auf dem Server (Beispiel)
    // this.logErrorToServer(error, errorMessage);

    // Benachrichtigung des Benutzers im Angular-Kontext
    ngZone.run(() => {
      notificationService.showError(userMessage);
    });

    // Wichtig: Der Fehler muss trotzdem geloggt werden, auch wenn er abgefangen wird
    // Mit console.error wird er in der Browser-Konsole sichtbar bleiben.
    // Für die Produktion sollten Sie dies durch ein echtes Logging ersetzen.
    console.error(errorMessage, error);
  }

  // Beispiel für eine Methode zum Logging auf einem Backend-Server
  // private logErrorToServer(error: any, errorMessage: string): void {
  //   // Hier würden Sie einen HTTP-Request an Ihr Backend senden, um den Fehler zu protokollieren
  //   // Beispiel:
  //   // const http = this.injector.get(HttpClient);
  //   // http.post('/api/errors', {
  //   //   message: errorMessage,
  //   //   stack: error.stack,
  //   //   timestamp: new Date().toISOString()
  //   // }).subscribe();
  // }
}