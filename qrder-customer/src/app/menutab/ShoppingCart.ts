import {MenuCategory} from './MenuCategory';
import {MenuItem} from './MenuItem';

export class ShoppingCart {
  items: MenuItem[] = [];

  constructor() {
  }

  public addItem(newItem: MenuItem) {
    const singeItem = this.items.find(element => element === newItem);

    if(singeItem === undefined) {
      this.items.push(newItem);
    } else {
      singeItem.amountInCart++;
    }
    console.log("New item added: " + newItem.name);s
  }

  public isEmpty(): boolean {
    return this.items.length <= 0;
  }

  public removeItemAt(index: number) {
    const singleItem = this.items[index];
    if(singleItem !== undefined && singleItem.amountInCart > 1) {
      singleItem.amountInCart--;
    } else {
      delete this.items[index];
    }
  }

  public indexOf(item: MenuItem): number {
    return this.items.indexOf(item);
  }
}
