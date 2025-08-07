import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Blog } from '../../shared/models/blog.model';
import { BackendResponse } from '../../shared/models/backend-response.model';

// @Injectable macht diesen Service in der ganzen App verfügbar (Dependency Injection)
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // Die Basis-URL für die API-Endpunkte
  private apiUrl = '/api/entries';

  constructor(private http: HttpClient) { }

  /**
   * Holt die Liste aller Blog-Einträge vom Backend.
   * @returns Ein Observable mit einem Array von Blog-Einträgen.
   */
  getBlogs(): Observable<Blog[]> {
    return this.http.get<BackendResponse>(this.apiUrl).pipe(
      // Extrahiert das 'data'-Array aus der Backend-Antwort
      map(response => response.data),
      // Fängt Fehler ab und gibt sie weiter, damit der GlobalErrorHandler sie behandeln kann
      catchError(this.handleError)
    );
  }

  /**
   * Holt einen einzelnen Blog-Eintrag anhand seiner ID.
   * Nützlich für die Detailansicht und den Resolver.
   * @param id Die ID des Blog-Eintrags.
   * @returns Ein Observable mit einem einzelnen Blog-Eintrag.
   */
  getBlogById(id: string | number): Observable<Blog> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Eine private Methode zur zentralen Fehlerbehandlung.
   */
  private handleError(error: any): Observable<never> {
    console.error('Ein Fehler ist im BlogService aufgetreten:', error);
    // Wirft den Fehler weiter, damit andere Teile der App darauf reagieren können
    return throwError(() => new Error('Fehler bei der Kommunikation mit dem Server.'));
  }
}