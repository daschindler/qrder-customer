export class MenuItem {
  id: number;
  name: string;
  price: number;
  amount: number;
  amountInCart: number;

  constructor(id: number, name: string, price: number, amount: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
    this.amountInCart = 0;
  }

  totalPrice(): number {
    return this.amountInCart * this.price;
  }
}
