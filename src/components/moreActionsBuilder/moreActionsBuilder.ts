import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';

@Component({
	selector: 'more-actions-builder-component',
	templateUrl: 'moreActionsBuilder.html'
})
export class moreActionsBuilderComponent implements OnInit {
	private options: Array<{ title: string, page?: any, icon: string }>;
	private operation: string;

	constructor(public viewCtrl: ViewController,
		private navCtrl: NavController,
		private navParams: NavParams,
		private authService: AuthService) { }

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

	goToHome() {
		this.navCtrl.setRoot(HomePage);
		this.viewCtrl.dismiss();
	}

	doLogout() {
		this.authService.doLogout().subscribe(
			response => {
				this.navCtrl.setRoot(LoginPage);
				this.viewCtrl.dismiss();
			});
	}
}