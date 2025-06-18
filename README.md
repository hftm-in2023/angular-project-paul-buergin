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
