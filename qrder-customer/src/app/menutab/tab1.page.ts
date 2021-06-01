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

  toggleFavourites(item: MenuCategory) {
    item.visible = !item.visible;
  }

  clearSearch() {
    this.data = this.unfilteredData;
  }

  addToFavourites(item: MenuItem) {
    console.log('long press succeeded!');
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
  }
}
