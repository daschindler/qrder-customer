import {Component} from '@angular/core';
import {MenuCategory} from './menutab/MenuCategory';
import {MenuItem} from './menutab/MenuItem';
import {ShoppingCart} from './menutab/ShoppingCart';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  favourites: MenuItem[] = [];
  favouritesCategories: MenuCategory[] = [new MenuCategory('Favourites', 'star-outline', this.favourites)];
  shoppingCart: ShoppingCart = new ShoppingCart();

  constructor(public toastController: ToastController) {
    this.readLocalStorageFavourites();
  }

  public getFavourites(): MenuCategory[] {
    return this.favouritesCategories;
  }

  async presentToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      position: 'top',
      duration: 2000
    });
    await toast.present();
  }

  public addFavourite(newFavourite: MenuItem) {
    newFavourite.amountInCart = 0;

    if (this.favourites.filter(item => item.id === newFavourite.id).length > 0) {
      //already exists in favourites, delete it instead of adding it.
      this.favourites = this.favourites.filter(item => item.id !== newFavourite.id);
      this.presentToast(`Removed '${ newFavourite.name }' from favourites`).then();
    } else {
      // otherwise add the new favourite
      this.favourites.push(newFavourite);
      this.presentToast(`Added '${ newFavourite.name }' to favourites.`).then();
    }

    this.updateLocalStorage();
    this.readLocalStorageFavourites();
  }

  updateLocalStorage() {
    console.log('Updating local storage with: ' + JSON.stringify(this.favourites));
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  readLocalStorageFavourites() {
    this.favourites = JSON.parse(localStorage.getItem('favourites'));

    if (this.favourites == null) {this.favourites = [];}

    this.favouritesCategories[0].items = this.favourites;
    console.log('Read from storage: ' + JSON.stringify(this.favourites));
  }

  formatNicely(price: number): string {
    return price.toFixed(2).replace('.', ',');
  }
}
