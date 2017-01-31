import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { TransactionService } from '../../services/TransactionService';
import { AlertService } from '../../services/AlertService';
import { Transaction } from '../../domain/Transaction';

@Component({
	selector: 'page-add-transaction',
	templateUrl: 'addTransaction.html'
})
export class AddTransactionPage implements OnInit {
	private definitionTransaction: any;
	private fields: Array<any>;
	private transaction: Transaction;

	constructor(private viewCtrl: ViewController,
		private transactionService: TransactionService,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.transactionService.describe()
			.subscribe(
			response => {
				this.definitionTransaction = response;
				this.fields = this.definitionTransaction.POST;
			},
			error => this.alertService.showError('Connection problem!')
			);
	}

	onCreated(transaction: Transaction) {
		this.transaction = transaction;
		this.transactionService.post(this.transaction)
			.subscribe(
			response => this.viewCtrl.dismiss({
				success: true
			}),
			error => this.alertService.showError(error)
			);
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
