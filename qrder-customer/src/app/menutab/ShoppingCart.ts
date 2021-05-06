import {MenuCategory} from './MenuCategory';
import {MenuItem} from './MenuItem';

export class ShoppingCart {
  items: MenuItem[] = [];

  constructor() {
  }

  public addItem(newItem: MenuItem) {
  }


  public removeItemAt(index: number) {
    delete this.items[index];
  }

  public indexOf(item: MenuItem): number {
    return this.items.indexOf(item);
  }
}
