import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'popover-menu-option',
	templateUrl: 'menu-option.html'
})
export class MenuOptionPopover implements OnInit {
	private options: Array<{ title: string, page?: any }>;

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		private navParams: NavParams) { }

	ngOnInit(): void {
		if (this.navParams.data) {
			this.options = this.navParams.data.options;
		}
	}

	goToPage(option) {
		let page = option.page;
		if (page) {
			this.navCtrl.push(page, option.params);
			this.viewCtrl.dismiss();
		}
	}
}
