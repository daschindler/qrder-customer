import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {AppComponent} from '../app.component';
import {ShoppingCart} from '../menutab/ShoppingCart';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  qrData = 'zack brack qr code ins gnack';
  qrColor;
  cart: ShoppingCart;
  constructor(public app: AppComponent, public alertController: AlertController) {
    this.cart = this.app.shoppingCart;
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.qrColor = prefersDark.matches ? '#ffffff' : '#000000';
  }
  clickedClear() {
    // Clear the cart
    this.cart.emptyCart();
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
