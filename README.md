# 2025-08-10
## Schritt 5: Interceptor
Ich habe einen Logging-Interceptor erstellt, welcher den HTTP Traffic in der Browser Konsole dokumentiert.  
## Zusammenfassung von gemini:  
Implementierung eines HTTP-InterceptorsGemäss der Aufgabenstellung wurde ein HTTP-Interceptor implementiert, um alle ausgehenden Netzwerkanfragen und die dazugehörigen Antworten zentral zu verwalten. Ein Interceptor agiert wie eine "Middleware" oder ein "Kontrollpunkt", den jede HttpClient-Anfrage durchlaufen muss.Anwendungsfall: Logging-InterceptorFür dieses Projekt wurde ein Logging-Interceptor als funktionaler Interceptor (HttpInterceptorFn) umgesetzt. Seine Hauptaufgaben sind:Protokollierung von Anfragen: Sobald eine HTTP-Anfrage die Anwendung verlässt, wird eine Konsolennachricht mit der Methode (z.B. GET) und der Ziel-URL ausgegeben.Protokollierung von Antworten: Nach Erhalt der Antwort vom Server wird eine weitere Konsolennachricht ausgegeben, die den Status-Code (z.B. 200 OK) und die Dauer der Anfrage in Millisekunden enthält.Fehlerprotokollierung: Schlägt eine Anfrage fehl, wird dies ebenfalls mit einer detaillierten Fehlermeldung in der Konsole protokolliert.Dieses Vorgehen ist extrem nützlich für die Fehlersuche, da der gesamte Netzwerkverkehr der Anwendung an einer zentralen Stelle transparent nachverfolgt werden kann.Registrierung in der AnwendungDer funktionale Interceptor wurde in der zentralen Konfigurationsdatei src/app/app.config.ts registriert. Dies geschah mithilfe der provideHttpClient-Funktion und dem withInterceptors-Feature, das in modernen Angular-Versionen zur Verfügung steht:// in app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([loggingInterceptor])
    ),
    // ... andere Provider
  ]
};
Durch diese zentrale Registrierung wird sichergestellt, dass jede HttpClient-Anfrage in der gesamten Anwendung automatisch und ohne weitere Konfiguration durch den Logging-Interceptor geleitet wird.  

## Schritt 4: Validierung mit zod
Funktioniert, habe blog.schema.ts so konfiguriert, dass alle Blogs, bei denen der Author keine email Adresse ist, herausgefiltert werden.    
## Zusammenfassung von gemini:  
Datenvalidierung mit ZodUm die Anwendung robuster gegen unerwartete oder fehlerhafte Daten vom Backend zu machen, wurde die Bibliothek Zod für die Laufzeit-Validierung implementiert. Eine TypeScript-interface allein bietet nur Sicherheit zur Entwicklungszeit; Zod stellt sicher, dass die echten API-Daten zur Laufzeit der erwarteten Struktur entsprechen.Implementierungs-AnsatzSchema-Definition: Für die Datenmodelle (Blog, BackendResponse) wurden Zod-Schemas in *.schema.ts-Dateien erstellt. Diese definieren die erwarteten Datentypen und Validierungsregeln (z.B. .string(), .number(), .email(), .optional()).Typ-Ableitung: Der TypeScript-Typ wurde direkt vom Schema abgeleitet (z.infer<typeof ...>), um eine einzige Quelle der Wahrheit für Datenstruktur und Validierung zu schaffen und redundante interface-Definitionen zu vermeiden.Integration im Service: Die Validierung wurde im BlogService direkt nach dem Empfang der HTTP-Antwort integriert.Wichtige Erkenntnis: Robuste Filterung statt "Alles oder Nichts"Anfänglich wurde die strenge .parse()-Methode von Zod verwendet. Dies führte dazu, dass bei einem einzigen fehlerhaften Datensatz in der Liste die gesamte Anfrage fehlschlug und keine Blogs angezeigt wurden.Um die User Experience zu verbessern, wurde die Logik auf die flexiblere .safeParse()-Methode umgestellt:Der BlogService validiert jetzt jeden Blog-Eintrag einzeln in einer Schleife.Gültige Einträge werden gesammelt und an die Benutzeroberfläche weitergegeben.Ungültige Einträge werden herausgefiltert und mit einer detaillierten Fehlermeldung in der Entwicklerkonsole protokolliert.Dieser Ansatz stellt sicher, dass die Anwendung auch bei teilweise fehlerhaften Daten vom Backend funktionsfähig bleibt und dem Benutzer alle korrekten Informationen anzeigt.  
  
  
---  
im branch feature/zod_dev weitermachen  
---  
  


# 2025-08-09
Nach mehreren Tagen rumbasteln durch angular update v18 -> v20 projekt zerschossen.  
Schlussendlich älterer commit zum head gemacht, und unter v20 zum laufen gebracht.  
Stand: Sprint 2a, Teil 3 erledigt.


# 2025-08-07
# Sprint 2a
## Schritt 1: Detailseite eines Blogs
Wurde in Sprint 2 schon erledigt
## Schritt 2: Navigation zur Übersicht
Wurde in Sprint 2 schon erledigt
## Schritt 3: Smart/Dumb Pattern
Die blog-detail.component (html, scss, ts) wurden ersetzt durch eine smart/dumb Ordnerstruktur.
Die neuen Files lauten:
blog-display.component (html, scss, ts)  
und  
blog-detail.container (html, scss, ts)  
 
Das Selbe mit den blog-list.component (html, scss, ts)  
Diese wurden ersetzt durch:  
blog-card.component (html, scss, ts)  
und  
blog-list.container (html, scss, ts)  



# 2025-06-26
# Sprint 2
## neue Features:
- Lazy Loading  
- Angular Resolver  
- Global Error Handler



# 2025-06-18
# Angular Blog Projekt
## Überblick

Dieses Projekt ist ein im Rahmen eines Schulprojekts (HFTM) entwickelter Angular-Client, der dazu dient, Blog-Einträge von einem externen Backend abzurufen und in einer benutzerfreundlichen Oberfläche darzustellen. Es handelt sich um eine Single Page Application (SPA), die die Kernkonzepte von Angular demonstriert, insbesondere das Routing, den HTTP-Datenabruf und das komponentenbasiertes Styling.
Features

Das Projekt bietet die folgenden Hauptfunktionen:

    Blog-Übersicht: Zeigt eine Liste aller verfügbaren Blog-Einträge auf der Startseite an.
    Blog-Detailansicht: Ermöglicht das Anzeigen der vollständigen Details eines einzelnen Blog-Eintrags durch Klick auf einen Eintrag in der Liste.
    Backend-Integration: Ruft Blog-Daten von einem externen REST-API-Backend ab.
    Komponentenbasiertes Design: Strukturierung der Anwendung in separate, wiederverwendbare Angular-Komponenten.
    SCSS-Styling: Trennung des Stylings vom HTML mithilfe von SCSS für eine saubere und wartbare Codebasis.

## Aktueller Status

Das Projekt befindet sich in einem funktionsfähigen Zustand. Die Kernfunktionalität des Abrufs und der Anzeige von Blog-Einträgen aus dem Backend ist vollständig implementiert.

## Bekannte Einschränkungen / Zukünftige Entwicklungen:

    Derzeit gibt es keine Funktionen zur Erstellung, Bearbeitung oder Löschung von Blog-Einträgen.
    Es ist keine Benutzerauthentifizierung oder -verwaltung integriert. (Dies ist für spätere Phasen geplant).
    Die mobile Optimierung (Responsive Design) könnte noch weiter verbessert werden.

## Verwendete Technologien

    Angular (Version 18.2.13)
    TypeScript
    SCSS (Sass)
    RxJS (für reaktive Programmierung und HTTP-Anfragen)
    Angular CLI (für Projektgenerierung und Build-Prozess)

## Backend-Anbindung

Dieses Frontend greift auf das folgende Blog-Backend zu:
https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io

Der Zugriff erfolgt über einen Angular Proxy, der Anfragen an /api auf diese Backend-URL umleitet. Dies ist in proxy.conf.json konfiguriert.
Installation und Ausführung

Befolgen Sie diese Schritte, um das Projekt lokal einzurichten und auszuführen:
Voraussetzungen

Stellen Sie sicher, dass die folgenden Tools auf Ihrem System installiert sind:

    Node.js (Version 16.x oder neuer wird empfohlen, basierend auf package.json)
    npm (wird mit Node.js installiert)
    Angular CLI (global installiert: npm install -g @angular/cli)

## Schritte

    Repository klonen:
    Bash

git clone <URL_ZU_IHREM_REPOSITORY>
cd angular-blog

(Ersetzen Sie <URL_ZU_IHREM_REPOSITORY> durch die tatsächliche URL Ihres Git-Repositories.)

Abhängigkeiten installieren:
Navigieren Sie zum Projektverzeichnis und installieren Sie alle erforderlichen Node-Module:
Bash

npm install

Anwendung starten:
Starten Sie den Angular-Entwicklungsserver. Die Anwendung wird mit der Proxy-Konfiguration ausgeführt, um mit dem Backend zu kommunizieren.
Bash

    ng serve

    Nach dem Start ist die Anwendung typischerweise unter http://localhost:4200/ erreichbar.

    Im Browser öffnen:
    Öffnen Sie Ihren Webbrowser und navigieren Sie zu http://localhost:4200/, um die Blog-Übersicht anzuzeigen.

## Projektstruktur (Auszug)

    src/app/: Hauptanwendungslogik
        app.component.ts: Hauptkomponente, globales Layout (Header, Footer, RouterOutlet)
        app.component.html: HTML-Template für das globale Layout
        app.component.scss: SCSS-Styles für das globale Layout
        blog-list/: Komponente für die Blog-Übersichtsliste
            blog-list.component.ts
            blog-list.component.html
            blog-list.component.scss
        blog-detail/: Komponente für die Blog-Detailansicht
            blog-detail.component.ts
            blog-detail.component.html
            blog-detail.component.scss
        app.routes.ts: Definiert die Anwendungsrouten
    src/styles.scss: Globale Styles und Basis-CSS
    proxy.conf.json: Konfiguration für den API-Proxy zum Backend





# 2025-06-17 
Test Request gemacht

# 2025-06-09

Mein Azure Account sieht das hftm repo nicht.
Ich kann nur ein repo von einem eigenen Github Account auswählen.
Ich benutze  PBuergin / angular-project-paul-buergin als Hauptrepo,
und benutze  hftm-in2023 / angular-project-paul-buergin als Zweitrepo zur Dokumentation.

Damit der Build funktioniert, musste ich Node auf Version 18.20.8 und Angular auf Version 17 zurücksetzen.


#  2025-06-05 - Sprint 0
Aufsetzen des Projektes nach Script
Auf Schritt 4 stecken geblieben, da ich auf Azure nicht genug Berechtigung habe um static web app zu erstellen.




# AngularBlog

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
