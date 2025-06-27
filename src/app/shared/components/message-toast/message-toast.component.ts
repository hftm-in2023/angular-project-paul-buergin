import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-message-toast',
  standalone: true,
  template: '', // Kein separates HTML
  styleUrls: ['./message-toast.component.scss'],
})
export class MessageToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() duration: number = 3000; // Dauer in ms (optional)

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'toast-container');

    const textContent = this.message?.trim() || 'Ein Fehler ist aufgetreten';
    const text = this.renderer.createText(textContent);
    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.elRef.nativeElement, div);

    this.renderer.setStyle(div, 'display', 'block');
    this.renderer.setStyle(div, 'opacity', '1');
    this.renderer.setStyle(div, 'visibility', 'visible');

    // Fade out nach duration ms
    setTimeout(() => {
      this.renderer.setStyle(div, 'transition', 'opacity 0.5s ease');
      this.renderer.setStyle(div, 'opacity', '0');

      setTimeout(() => {
        this.renderer.removeChild(this.elRef.nativeElement, div);
      }, 500); // Warte, bis Fade-out abgeschlossen ist
    }, this.duration);
  }
}
