import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { Offer } from '../domain/Offer';
import { OFFERS } from '../test/mock-offers';
import { OPTIONS_OFFER } from '../test/mock-options-offer';
import * as lodash from 'lodash';

@Injectable()
export class OfferService {

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth) { }

	list(): Observable<Array<Offer>> {
		return this.httpBasicAuth.get(this.settings.URL.config)
		// return this.httpBasicAuth.getWithAuth(this.settings.URL.offers)
		.map(response => {
			response = OFFERS;
			response = lodash.map(response, (offer: Offer) => {
				return offer;
			});
			return response;
		});
	}

	get(id): Observable<Offer> {
		return this.httpBasicAuth.get(this.settings.URL.config)
		// return this.httpBasicAuth.getWithAuth(`${this.settings.URL.offers}/${id}`)
		.map(response => {
			response = OFFERS[id];
			return response;
		});
	}

	post(offer: Offer): Observable<Offer> {
		return this.httpBasicAuth.get(this.settings.URL.config)
		// return this.httpBasicAuth.postWithAuth(this.settings.URL.offers)
		.map(response => {
			response = OFFERS[1];
			return response;
		});
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