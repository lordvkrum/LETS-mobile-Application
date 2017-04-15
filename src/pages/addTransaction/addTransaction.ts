import { Component, OnInit } from '@angular/core';
import { ViewController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { TransactionService } from '../../services/TransactionService';
import { AlertService } from '../../services/AlertService';
import { Transaction } from '../../domain/Transaction';
import { assign } from 'lodash';

@Component({
	selector: 'page-add-transaction',
	templateUrl: 'addTransaction.html'
})
export class AddTransactionPage implements OnInit {
	private definitionTransaction: any;
	private fields: Array<any>;
	private transaction: Transaction;
	private isValid: boolean = false;
	private loader: Loading
	private isLoaded: boolean = false;
	private title: string;

	constructor(public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		private navParams: NavParams,
		private transactionService: TransactionService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		if (this.navParams.data) {
			this.title = this.navParams.data.title;
		}
		this.isLoaded = false;
		this.viewCtrl.didEnter.subscribe(
			response => {
				if (!this.isLoaded) {
					this.loader = this.loadingCtrl.create({
						content: 'Please wait...'
					});
					this.loader.present();
					this.transactionService.describe().subscribe(
						response => {
							this.isLoaded = true;
							this.definitionTransaction = response;
							if (this.navParams.data && this.navParams.data.fields) {
								for (let i in this.navParams.data.fields) {
									if (this.definitionTransaction.POST[i]) {
										assign(this.definitionTransaction.POST[i], this.navParams.data.fields[i]);
									}
								}
							}
							this.fields = this.definitionTransaction.POST;
							this.loader.dismiss();
						},
						error => {
							this.alertService.showError(error);
							this.loader.dismiss();
						});
				}
			});
	}

	onChanged(options: { value: Transaction, isValid: boolean }) {
		this.transaction = options.value;
		this.isValid = options.isValid;
	}

	addTransaction() {
		this.transactionService.post(this.transaction).subscribe(
			response => this.viewCtrl.dismiss(),
			error => this.alertService.showError(error));
	}

	onConfirmed(transaction: Transaction) {
		this.transaction = transaction;
		this.transactionService.post(this.transaction).subscribe(
			response => this.viewCtrl.dismiss({
				success: true
			}),
			error => this.alertService.showError(error));
	}
}
