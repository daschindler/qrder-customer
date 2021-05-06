import {MenuItem} from './MenuItem';

export class ShoppingCart {
  items: MenuItem[] = [];

  constructor() {
  }

  public addItem(newItem: MenuItem) {
    const singeItem = this.items.find(element => element === newItem);

    if(singeItem === undefined) {
      newItem.amountInCart++;
      this.items.push(newItem);
    } else {
      singeItem.amountInCart++;
    }
  }

  public totalAmountOfItemsInCart(): number {
    return this.items.reduce((partialSum, item) => partialSum + item.amountInCart, 0);
  }

  public totalPrice(): number {
    return this.items.reduce((partialSum, item) => partialSum + item.totalPrice(), 0);
  }

  public emptyCart() {
    this.items = [];
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
