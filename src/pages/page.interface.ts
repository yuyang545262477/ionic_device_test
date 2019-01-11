export interface PageInterface {
  ionViewDidLoad?()// only when a view is stored in memory.

  ionViewWillEnter?(); // before it becomes the active

  ionViewDidEnter?(); // after it becomes the active page.

  ionViewWillLeave?();// before it stops being the active

  ionViewDidLeave?();// after it stops being the active

  ionViewWillUnload?();//when a view is going to be completely removed
}
