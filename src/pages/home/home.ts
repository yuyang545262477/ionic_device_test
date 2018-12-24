import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

class HomeRoute {
  name: string;
  path: string;

  constructor(title: string) {
    this.name = title;
    this.path = `${title}Page`
  }
}

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  titles: string[] = ['Camera', 'Audio', 'Geolocation', 'Network', 'SecureFile', 'Media'];
  homeRoutes: HomeRoute[] = [];

  constructor(public navCtrl: NavController) {
    this.homeRoutes = this.renderHomeRoutes(this.titles);
  }

  goPage(path?: string) {
    this.navCtrl.push(path)
  }

  private renderHomeRoutes(titles: string[]): HomeRoute[] {
    const backItems: HomeRoute[] = [];
    titles.forEach
    ((item) => {
      backItems.push(new HomeRoute(item));
    });
    return backItems;
  }


}

