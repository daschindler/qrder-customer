import {Component} from '@angular/core';
import {MenuCategory} from './MenuCategory';
import {MenuItem} from './MenuItem';
import {TabsPage} from '../tabs/tabs.page';
import {AppComponent} from '../app.component';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data: MenuCategory[] = [];
  unfilteredData: MenuCategory[] = [];
  url = 'assets/data/items.json';
  isLongPressing = false;
  favourites: MenuCategory[] = [];

  constructor(public tabs: TabsPage, public app: AppComponent, public http: HttpClient) {
    this.getCategories();
    this.favourites = this.app.getFavourites();
  }


  ionViewDidEnter() {
    const shoppingCartItems = this.app.shoppingCart.items;
    // check shopping cart data and align with favourites
    if (shoppingCartItems.length === 0) {
      // shopping cart got cleared as a whole ==> all favourites are 0 amount now
      this.favourites.forEach(category => {
        category.items.forEach(item => {
          item.amountInCart = 0;
        });
      });
    }

    // shopping cart wasn't cleared; maybe some amounts changed, check all the favourites
    this.favourites.forEach(category => {
      category.items.forEach(favouriteItem => {
        const shoppingItem = shoppingCartItems.find(item => item.id === favouriteItem.id);

        if (shoppingItem === null || shoppingItem === undefined) {
          favouriteItem.amountInCart = 0;
        } else {
          favouriteItem.amountInCart = shoppingItem.amountInCart;
        }
      });
    });
  }

  toggleFavourites(item: MenuCategory) {
    item.visible = !item.visible;
  }

  clearSearch() {
    this.data = this.unfilteredData;
  }

  addToFavourites(item: MenuItem) {
    // Toast about adding favourite
    this.app.addFavourite(item);
  }

  filterItems(searchEvent) {
    const searchTerm: string = searchEvent.srcElement.value;

    console.log('Search term: ' + searchTerm);
    this.cloneUnfilteredData();

    if (searchTerm === null || searchTerm.length <= 0) {
      return;
    }

    // Filter all items that match the entered search term
    this.data = this.data.map(categories => {
      const category = categories;
      category.items = categories.items.filter(item => this.itemMatches(item.name, searchTerm));
      category.visible = category.items.length !== 0; // make all categories visible during search (if there are matching items)
      return category;
    });
  }

  didReleasePress() {
    console.log('Did release.');
    this.isLongPressing = false;
  }

  longPressTriggeredFromFramework(menuItem: MenuItem) {
    if (!this.isLongPressing) {
      this.didLongPress(menuItem);
    }
    this.isLongPressing = true;
  }

  didLongPress(menuItem: MenuItem) {
    this.addToFavourites(menuItem);
    console.log('Do something on long press');
  }

  cloneUnfilteredData() {
    // clear data and overwrite it with new, completely unfiltered data
    this.data = [];
    this.unfilteredData.forEach(val =>
      this.data.push(Object.assign({}, val))
    );
  }

  itemMatches(name: string, searchTerm: string): boolean {
    return name.toLowerCase().includes(searchTerm.toLowerCase(), 0);
  }

  public readJsonData(): Observable<MenuCategory[]> {
    return this.http.get<MenuCategory[]>('assets/data/items.json');
  }

  public getCategories() {
    this.readJsonData().subscribe(categories => {
      console.log(categories);
      this.unfilteredData = categories;
      this.cloneUnfilteredData();
    });
  }

  toggleItem(item: MenuCategory) {
    item.visible = !item.visible;

    // also set visibility of unfiltered data so it reflects the right visibility after the search
    // this.unfilteredData.find(category => category.name === item.name).visible = !item.visible;
  }

  subitemPicked(subitem: MenuItem) {
    this.app.shoppingCart.addItem(subitem);
    // also go through favourites to add it if necessary
    this.favourites.forEach(category => {
      category.items.filter(item => item.id === subitem.id).forEach(favouriteItem => {
        favouriteItem.amountInCart += 1;
      });
    });

  }

  favouritePicked(subitem: MenuItem) {
    // find item in original item list and add that one
    this.data.forEach(category => {
        category.items.filter(item => item.id === subitem.id).forEach(filteredItem => {
            this.app.shoppingCart.addItem(filteredItem);
            // add badge to favourite as well
            subitem.amountInCart += 1;
          }
        );
      }
    );
  }
}
