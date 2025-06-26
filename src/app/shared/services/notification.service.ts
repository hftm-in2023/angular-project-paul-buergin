// src/app/shared/services/notification.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// Interface für die Nachricht
export interface AppMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
  duration?: number; // Optional: Dauer in ms, bis die Nachricht verschwindet
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new Subject<AppMessage>();
  messages$: Observable<AppMessage> = this.messageSubject.asObservable();

  constructor() { }

  /**
   * Zeigt eine Nachricht an.
   * @param type Typ der Nachricht ('success', 'error', 'info', 'warning')
   * @param text Der anzuzeigende Text
   * @param duration Optional: Dauer in ms (Standard: 3000ms für Success/Info, 5000ms für Error/Warning)
   */
  showMessage(type: AppMessage['type'], text: string, duration?: number): void {
    const defaultDuration = (type === 'error' || type === 'warning') ? 5000 : 3000;
    this.messageSubject.next({ type, text, duration: duration || defaultDuration });
  }

  showSuccess(text: string, duration?: number): void {
    this.showMessage('success', text, duration);
  }

  showError(text: string, duration?: number): void {
    this.showMessage('error', text, duration);
  }

  showInfo(text: string, duration?: number): void {
    this.showMessage('info', text, duration);
  }

  showWarning(text: string, duration?: number): void {
    this.showMessage('warning', text, duration);
  }
}