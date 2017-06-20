import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { TransactionService } from '../../services/TransactionService';
import { AlertService } from '../../services/AlertService';
import { Transaction } from '../../domain/Transaction';
import { AddTransactionPage } from '../addTransaction/addTransaction';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	private username: string;
	private canPost = false;
	private success = false;
	private definitionTransaction: any;
	private transactions: Array<Transaction>;

	constructor(private menuCtrl: MenuController,
		private modalCtrl: ModalController,
		private authService: AuthService,
		private transactionService: TransactionService,
		private alertService: AlertService) {
		this.menuCtrl.enable(true, 'app-menu');
		this.authService.userInfo.subscribe(
			userInfo => {
				this.username = userInfo.name;
			});
	}

	ngOnInit(): void {
		this.transactionService.describe()
			.subscribe(
			response => {
				this.definitionTransaction = response;
				this.canPost = !!this.definitionTransaction.POST;
			},
			error => this.alertService.showError('Connection problem!')
			);
		this.loadTransactions();
	}

	loadTransactions() {
		this.transactionService.list()
			.subscribe(
			response => this.transactions = response,
			error => this.alertService.showError('Connection problem!')
			);
	}

	addTransaction() {
		let modal = this.modalCtrl.create(AddTransactionPage);
		modal.onDidDismiss((data: any = {}) => {
			this.success = data.success;
			this.loadTransactions();
		});
		modal.present();
	}
}
