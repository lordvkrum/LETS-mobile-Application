import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Transaction } from '../domain/Transaction';
import { TRANSACTIONS } from '../test/mock-transactions';

@Injectable()
export class TransactionService {

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(): Observable<Array<Transaction>> {
		// return this.httpBasicAuth.getWithAuth(this.settings.URL.transactions)
		return this.httpBasicAuth.get(this.settings.URL.config)
		.map(response => {
			return TRANSACTIONS;
		});
	}
}