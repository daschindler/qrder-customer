import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  qrData = 'zack brack qr code ins gnack';
  qrColor;
  constructor() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.qrColor = prefersDark.matches ? '#ffffff' : '#000000';
  }
}
