import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
	selector: 'confirmation-builder-component',
	templateUrl: 'confirmationBuilder.html'
})
export class ConfirmationBuilderComponent implements OnInit {
	private fields: Array<any>;
	private operation: string;

	constructor(public viewCtrl: ViewController,
		private navParams: NavParams) { }

	ngOnInit(): void {
		if (this.navParams.data) {
			this.fields = this.navParams.data.fields;
			this.operation = this.navParams.data.operation;
		}
	}

	doCancel() {
		this.viewCtrl.dismiss();
	}

	doConfirm() {
		this.viewCtrl.dismiss({
			hasConfirmed: true
		});
	}
}