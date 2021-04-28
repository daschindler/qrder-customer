import {MenuItem} from './MenuItem';

export class MenuCategory {
  name: string;
  imagePath: string;
  items: MenuItem[];
  visible: boolean;

  constructor(name: string, imagePath: string, items: MenuItem[]) {
    this.name = name;
    this.imagePath = imagePath;
    this.items = items;
    this.visible = false;
  }

}