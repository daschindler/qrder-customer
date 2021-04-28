import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  itemCount = 0;

  constructor() {}

  public incrementItemCount() {
    this.itemCount++;
  }
}
