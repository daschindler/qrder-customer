import { Component } from '@angular/core';
import {MenuCategory} from './menutab/MenuCategory';
import {MenuItem} from './menutab/MenuItem';
import {ShoppingCart} from './menutab/ShoppingCart';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  favourites: MenuItem[] = [
    new MenuItem(1, 'Freistädter Imperator', 3.8, 0.33),
    new MenuItem(2, 'Freistädter Ratsherrn', 4, 0.5)
  ];
  favouritesCategories: MenuCategory[] = [
    new MenuCategory('Favourites', 'star-outline', this.favourites),
  ];
  shoppingCart: ShoppingCart = new ShoppingCart();

  constructor() {}

  public getFavourites(): MenuCategory[] {
    return this.favouritesCategories;
  }

  formatNicely(price: number): string {
    return price.toFixed(2).replace('.', ',');
  }
}
