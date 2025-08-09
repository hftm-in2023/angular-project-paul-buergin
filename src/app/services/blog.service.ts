import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// HIER IST DIE KORREKTUR (Pfad und Dateiname):
import { BackendResponse, backendResponseSchema } from '../shared/models/backend-response.schema'; 
import { Blog, blogSchema, blogsSchema } from '../shared/models/blog.schema'; 

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = '/api/entries';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      map(response => backendResponseSchema.parse(response)),
      map(validatedResponse => validatedResponse.data),
      catchError(this.handleError)
    );
  }

  getBlogById(id: string | number): Observable<Blog> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<unknown>(url).pipe(
      map(blog => blogSchema.parse(blog)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ein Fehler ist im BlogService aufgetreten:', error);
    return throwError(() => new Error('Fehler bei der Kommunikation oder Datenvalidierung.'));
  }
}
