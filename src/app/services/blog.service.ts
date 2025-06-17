import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = '/api/blogs'; // Proxy nutzt /api

  constructor(private http: HttpClient) {}

  getBlog(): Observable<Blog> {
  return this.http.get<Blog>('/api/entries/1');
}

}
