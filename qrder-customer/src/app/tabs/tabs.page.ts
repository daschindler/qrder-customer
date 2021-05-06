import { Component } from '@angular/core';
import {AppComponent} from '../app.component';
import {ShoppingCart} from '../menutab/ShoppingCart';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  itemCount = 0;
  cart: ShoppingCart;
  constructor(public app: AppComponent) {
    this.cart = app.shoppingCart;
  }
}
