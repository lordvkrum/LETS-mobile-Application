import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'popover-menu-option',
	templateUrl: 'menu-option.html'
})
export class MenuOptionPopover implements OnInit {
	private options: Array<{ title: string, page?: any }>;
	private popover: any;

	constructor(private navCtrl: NavController,
		private navParams: NavParams) { }

	ngOnInit(): void {
		if (this.navParams.data) {
			this.options = this.navParams.data.options;
			this.popover = this.navParams.data.parent.popover;
		}
	}

	goToPage(option) {
		let page = option.page;
		if (page) {
			this.navCtrl.push(page);
			if (this.popover) {
				this.popover.dismiss();
			}
		}
	}
}
