import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Offer } from '../domain/Offer';
import { map } from 'lodash';

@Injectable()
export class OfferService {
	private pageSize: number = 20;

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(page): Observable<Array<Offer>> {
		let offset = this.pageSize * (page - 1);
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.offers}?depth=1&offset=${offset}&limit=${this.pageSize}&sort=expires,desc`)
			.map((response: Array<Offer>) => {
				response = map(response, (offer: Offer, key: any) => {
					if (!offer.id) {
						offer.id = key;
					}
					return offer;
				});
				return response;
			});
	}

	get(id): Observable<Offer> {
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.offers}/${id}?depth=2`);
	}

	post(offer: Offer): Observable<Offer> {
		return this.httpBasicAuth.postWithAuth(this.settings.URL.offers, offer);
	}

	describe(): Observable<any> {
		return this.httpBasicAuth.options(this.settings.URL.offers);
	}
}