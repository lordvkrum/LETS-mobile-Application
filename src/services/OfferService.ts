import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Offer } from '../domain/Offer';
import { map } from 'lodash';

@Injectable()
export class OfferService {

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(): Observable<Array<Offer>> {
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.offers}?depth=1`)
			.map((response: any) => {
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
		return this.httpBasicAuth.getWithAuth(`${this.settings.URL.offers}/${id}?depth=1`);
	}

	post(offer: Offer): Observable<Offer> {
		return this.httpBasicAuth.postWithAuth(this.settings.URL.offers, offer);
	}

	describe(): Observable<any> {
		return this.httpBasicAuth.options(this.settings.URL.offers);
	}
}