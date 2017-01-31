import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Offer } from '../domain/Offer';
import { OPTIONS_OFFER } from '../test/mock-options-offer';
import { OFFERS } from '../test/mock-offers';
import * as lodash from 'lodash';

@Injectable()
export class OfferService {

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(): Observable<Array<Offer>> {
		return this.httpBasicAuth.get(this.settings.URL.config)
		// return this.httpBasicAuth.getWithAuth(`${this.settings.URL.offers}?depth=1`)
			.map((response: Array<Offer>) => {
				response = <any>OFFERS;
				response = lodash.map(response, (offer: Offer, key: any) => {
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
		return this.httpBasicAuth.get(this.settings.URL.config)
		// return this.httpBasicAuth.options(this.settings.URL.offers)
			.map(response => {
				response = OPTIONS_OFFER;
				return response;
			});
	}
}