import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {AppComponent} from '../app.component';
import {ShoppingCart} from '../menutab/ShoppingCart';
import {MenuItem} from '../menutab/MenuItem';
import { PopoverController } from '@ionic/angular';
import {PopoverComponent} from './popover/popover.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // 2 Byte Version Number (range 0-65.535)
  // 4 Bit order amount (range 0-15), 12 Bit product id (range 0-4095 products)
  // E.g. order 0x00001033A002 = version 0x0000 with 0x1 amount of product 0x033 and
  // 0xA amount of product 0x002
  //
  // Unicode range 0 - 65535 / 0x0000 - 0xFFFF

  //test = intArray.reduce((partialSum, item) => partialSum + item.totalPrice(), 0);
  qrData;
  qrColor;
  cart: ShoppingCart;
  constructor(public app: AppComponent, public alertController: AlertController,
              public popoverController: PopoverController) {
    this.cart = this.app.shoppingCart;
    this.qrData = this.createQRData();
    // Use matchMedia to check the user preference
    //const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // Enforce light mode, because some scanners struggle with reading a dark qr-code
    this.qrColor = '#000000'; // prefersDark.matches ? '#ffffff' : '#000000';
  }
  clickedClear() {
    // Clear the cart
    this.cart.emptyCart();
  }

  createQRData(): string {
    // Use the version number on the client side for different future behaviour
    const version = 0;
    let qrData = String.fromCharCode(version);
    this.cart.items.forEach(item => {
      qrData += this.createEncodingForMenuItem(item);
    });
    return qrData;
  }
  createEncodingForMenuItem(item: MenuItem): string {
    if (item.amountInCart < 1) {
      return '';
    }
    let encoding = '';
    let openAmount = item.amountInCart;
    // 4 Byte for the amount, create a new element if amount exceeds.
    while (openAmount > 16) {
      openAmount -= 16;
      encoding += this.createEncodedCharacter(16, item.id);
    }
    encoding += this.createEncodedCharacter(openAmount, item.id);
    return encoding;
  }
  createEncodedCharacter(amount: number, id: number): string {
    // One character is 2 byte, like 0x1A03
    // The first hex number is the amount and the rest the product-id,
    // therefore multiply by 16^3
    // Reduce amount by 1 as there are no orders with 0 amount
    return String.fromCharCode(Math.pow(16, 3) * (amount-1) + id);
  }

  async presentPopover(order: MenuItem, cart: ShoppingCart) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      translucent: true,
      componentProps:{key1:order, key2: cart}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    if (order.amountInCart === 0) {
      if (this.cart.items.length === 1) {
        this.cart.emptyCart();
      } else {
        this.cart.items = this.cart.items.filter(predicate => predicate.id !== order.id);
      }
    }
    console.log('onDidDismiss resolved with role', role);
  }

  async presentClearAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete your order? The shopping cart will be empty afterwards.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Clicked cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Clicked Yes on clear alert.');
            this.clickedClear();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
