import { Component, OnInit } from '@angular/core';
import {MenuItem} from '../../menutab/MenuItem';
import {NavParams} from '@ionic/angular';
import {ShoppingCart} from '../../menutab/ShoppingCart';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  order: MenuItem;
  cart: ShoppingCart;
  constructor(public navParams: NavParams) {
    this.order = this.navParams.get('key1');
    this.cart = this.navParams.get('key2');
  }

  decrease() {
    if (this.order.amountInCart > 0) {
      this.order.amountInCart--;
    }
  }
  increase() {
    this.order.amountInCart++;
  }
  ngOnInit() {}

}
