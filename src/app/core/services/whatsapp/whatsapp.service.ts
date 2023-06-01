import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  private number: string;
  private message: string;

  constructor() { 
    this.number = '56996436811';
    this.message = 'Hola,%20estoy%20escribiendo%20desde%20tu%20portafolio';
  }

  onClickOnNumber(): void {
    const path = `https://api.whatsapp.com/send?phone=${this.number}&text=${this.message}`;
    const win = window.open(path, '_blank');
    win.focus();
  }
}
