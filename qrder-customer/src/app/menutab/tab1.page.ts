import {Component} from '@angular/core';
import {MenuCategory} from './MenuCategory';
import {MenuItem} from './MenuItem';
import {iterator} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data: MenuCategory[] = this.getData();

  constructor() {
  }

  test(id: number) {
    console.log(id);
  }

  public getData(): MenuCategory[] {
    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
    //   console.log('Directory doesn\'t exist'));
    const items: MenuItem[] = [
      new MenuItem('Red Bull', 3, 0.25),
      new MenuItem('Cola', 2.5, 0.5)
    ];

    return [
      new MenuCategory('Alcoholic', '../../assets/menu_icons/bottle-wine.svg', items),
      new MenuCategory('Non-Alcoholic', '../../assets/menu_icons/bottle-wine.svg', items)
    ];
  }
}
