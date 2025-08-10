import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BackendResponse, backendResponseSchema } from '../../shared/models/backend-response.schema'; 
import { Blog, blogSchema } from '../../shared/models/blog.schema'; 

@Injectable({
  providedIn: 'root'
})
// HIER IST DIE KORREKTUR:
// Das 'export'-Schlüsselwort macht die Klasse importierbar.
export class BlogService {
  private apiUrl = '/api/entries';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      // Tippfehler korrigiert: backendResponseSchema statt backendResponsecha
      map(response => backendResponseSchema.parse(response)),
      map(validatedResponse => {
        const validBlogs: Blog[] = [];
        validatedResponse.data.forEach(blogData => {
          const result = blogSchema.safeParse(blogData);
          if (result.success) {
            validBlogs.push(result.data);
          } else {
            console.warn('Ungültiger Blog-Eintrag wurde herausgefiltert:', {
              error: result.error.flatten(),
              rawData: blogData
            });
          }
        });
        return validBlogs;
      }),
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
