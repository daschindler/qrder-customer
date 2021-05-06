import {Component} from '@angular/core';
import {MenuCategory} from './MenuCategory';
import {MenuItem} from './MenuItem';
import {TabsPage} from '../tabs/tabs.page';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data: MenuCategory[] = this.getData();

  constructor(public tabs: TabsPage, public app: AppComponent) {
  }

  getFavourites(): MenuCategory[] {
    return this.app.getFavourites();
  }

  toggleFavourites(item: MenuCategory) {
    item.visible = !item.visible;
  }

  public getData(): MenuCategory[] {
    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
    //   console.log('Directory doesn\'t exist'));
    const beers: MenuItem[] = [
      new MenuItem('Freistädter', 3.8, 0.33),
      new MenuItem('Stiegl', 0.1, 0.5),
      new MenuItem('Zipfer', 3.5, 0.5),
      new MenuItem('Wieselburger', 3.6, 0.5),
    ];

    const whiskeys: MenuItem[] = [
      new MenuItem('Johnny Walker Black Label', 7, 0.4),
      new MenuItem('Makers Mark', 8, 0.4),
      new MenuItem('Lagavulin 16y', 12, 0.4),
      new MenuItem('Oban 14y', 10, 0.4),
      new MenuItem('Laphroaig 4 seasons', 9, 0.4)
    ];

    const wines: MenuItem[] = [
      new MenuItem('Deep Purple', 11, 0.75),
      new MenuItem('Blaufränkisch', 11, 0.75),
      new MenuItem('Dreigelt', 11, 0.75),
      new MenuItem('Gruener Veltliner langer Weinname', 6, 0.75),
      new MenuItem('Chardonnay', 8, 0.75),
      new MenuItem('Sauf-mi-au Blànc', 7, 0.75)
    ];

    return [
      new MenuCategory('Beer', 'beer-outline', beers),
      new MenuCategory('Wine', 'wine-outline', wines),
      new MenuCategory('Around the world', 'earth-outline', whiskeys),
    ];
  }

  toggleItem(item: MenuCategory) {
    item.visible = !item.visible;
  }

  subitemPicked(subitem: MenuItem) {
    this.app.shoppingCart.addItem(subitem);
    this.tabs.incrementItemCount();
  }

  formatNicely(price: number): string {
    return price.toFixed(2).replace('.', ',');
  }
}
