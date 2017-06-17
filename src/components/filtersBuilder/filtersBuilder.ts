import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'filters-builder-component',
	templateUrl: 'filtersBuilder.html'
})
export class FiltersBuilderComponent implements OnInit {
	private options: Array<{ title: string, page?: any, icon: string }>;
	private operation: string;

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		private navParams: NavParams) { }

	ngOnInit(): void {
		if (this.navParams.data) {
			this.options = this.navParams.data.options;
			this.operation = this.navParams.data.operation;
		}
	}

	goToPage(option) {
		let page = option.page;
		if (page) {
			this.navCtrl.popToRoot();
			this.navCtrl.push(page, option.params)
			this.viewCtrl.dismiss();
		}
	}
}