import { Component, OnInit } from '@angular/core';
import { ViewController, LoadingController, Loading, NavParams, PopoverController, Popover } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { TransactionService } from '../../services/TransactionService';
import { AlertService } from '../../services/AlertService';
import { ConfirmationBuilderComponent } from '../../components/confirmationBuilder/confirmationBuilder';
import { moreActionsBuilderComponent } from '../../components/moreActionsBuilder/moreActionsBuilder';
// import { TransactionsPage } from '../../pages/transactions/transactions';
import { Transaction } from '../../domain/Transaction';
import { Member } from '../../domain/Member';
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
	private popover: Popover;
	private member: Member;

	constructor(public viewCtrl: ViewController,
		private navParams: NavParams,
		public loadingCtrl: LoadingController,
		private popoverCtrl: PopoverController,
		private authService: AuthService,
		private transactionService: TransactionService,
		private alertService: AlertService) {
		this.authService.userInfo.subscribe(
			userInfo => this.member = userInfo);
	}

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
		this.popover = this.popoverCtrl.create(ConfirmationBuilderComponent, {
			fields: this.definitionTransaction.POST,
			operation: 'Transaction'
		}, {
				enableBackdropDismiss: false
			});
		this.popover.onDidDismiss((data) => {
			if (data && data.hasConfirmed) {
				this.loader = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loader.present();
				this.transactionService.post(this.transaction).subscribe(
					response => {
						this.loader.dismiss();
						this.popover = this.popoverCtrl.create(moreActionsBuilderComponent, {
							operation: 'Transaction',
							options: [{
								title: 'Record Transaction - as a Seller',
								icon: 'ion-edit',
								page: AddTransactionPage,
								params: {
									title: 'as Seller',
									fields: {
										payee: {
											default: this.member.name,
											disabled: true
										}
									}
								}
							}, {
								title: 'Record Transaction - as a Buyer',
								icon: 'ion-edit',
								page: AddTransactionPage,
								params: {
									title: 'as Buyer',
									fields: {
										payer: {
											default: this.member.name,
											disabled: true
										}
									}
								}
								// }, {
								// 	title: 'List Transactionings',
								// 	icon: 'ion-stats-bars',
								// 	page: TransactionsPage
							}]
						}, {
								enableBackdropDismiss: false
							});
						this.popover.present();
					},
					error => {
						this.alertService.showError(error);
						this.loader.dismiss();
					});
			}
		});
		this.popover.present();
	}
}
