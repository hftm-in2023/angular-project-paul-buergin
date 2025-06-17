import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: '<p>Test läuft – schau in die Konsole!</p>'
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('📡 Anfrage startet...');
    this.http.get('/api/blogs').subscribe({
      next: (data) => console.log('✅ Backend-Antwort:', data),
      error: (err) => console.error('❌ Fehler beim Backend-Aufruf:', err)
    });
  }
}
