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
  url = 'assets/data/items.json';

  constructor(public tabs: TabsPage, public app: AppComponent, public http: HttpClient) {
    this.getCategories();
  }

  getFavourites(): MenuCategory[] {
    return this.app.getFavourites();
  }

  toggleFavourites(item: MenuCategory) {
    item.visible = !item.visible;
  }

  public readJsonData(): Observable<MenuCategory[]> {
    return this.http.get<MenuCategory[]>('assets/data/items.json');
  }

  public getCategories() {
    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
    //   console.log('Directory doesn\'t exist'));
    this.readJsonData().subscribe(categories => {
      console.log(categories);
      this.data = categories;
    });

    const beers: MenuItem[] = [
      new MenuItem(1, 'Freistädter', 3.8, 0.33),
      new MenuItem(2, 'Stiegl', 0.1, 0.5),
      new MenuItem(3, 'Zipfer', 3.5, 0.5),
      new MenuItem(4, 'Wieselburger', 3.6, 0.5),
    ];

    const whiskeys: MenuItem[] = [
      new MenuItem(10, 'Johnny Walker Black Label', 7, 0.4),
      new MenuItem(11, 'Makers Mark', 8, 0.4),
      new MenuItem(12, 'Lagavulin 16y', 12, 0.4),
      new MenuItem(13, 'Oban 14y', 10, 0.4),
      new MenuItem(14, 'Laphroaig 4 seasons', 9, 0.4)
    ];

    const wines: MenuItem[] = [
      new MenuItem(20, 'Deep Purple', 11, 0.75),
      new MenuItem(21, 'Blaufränkisch', 11, 0.75),
      new MenuItem(22, 'Dreigelt', 11, 0.75),
      new MenuItem(23, 'Gruener Veltliner langer Weinname', 6, 0.75),
      new MenuItem(24, 'Chardonnay', 8, 0.75),
      new MenuItem(25, 'Sauf-mi-au Blànc', 7, 0.75)
    ];

    // return [
    //   new MenuCategory('Beer', 'beer-outline', beers),
    //   new MenuCategory('Wine', 'wine-outline', wines),
    //   new MenuCategory('Around the world', 'earth-outline', whiskeys),
    // ];
  }

  toggleItem(item: MenuCategory) {
    item.visible = !item.visible;
  }

  subitemPicked(subitem: MenuItem) {
    this.app.shoppingCart.addItem(subitem);
  }
}
