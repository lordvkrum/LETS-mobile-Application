import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as lodash from 'lodash';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { AlertService } from './AlertService';
import { CategoriesService } from './CategoriesService';
import { LocalitiesService } from './LocalitiesService';
import { Config } from '../domain/Config';
import { Category } from '../domain/Category';

@Injectable()
export class ConfigService {
	private config: Config;
	private appConfig = new Subject<Config>();
	getAppConfig = this.appConfig.asObservable();

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth,
		private alertService: AlertService,
		private categoriesService: CategoriesService,
		private localitiesService: LocalitiesService) { }

	loadAppConfig() {
		if (this.config) {
			this.appConfig.next(this.config);
		} else {
			this.requestAppConfig().subscribe(
				response => this.appConfig.next(response),
				error => this.alertService.showError('Connection problem!')
			);
		}
	}

	requestAppConfig(): Observable<Config> {
		return this.httpBasicAuth.get(this.settings.URL.config)
			.map(response => {
				this.config = response;
				this.categoriesService.setCategories(
					lodash.map(<any>this.config.categories, (category: Category, id: string) => {
						category.id = id;
						return category;
					}));
				this.localitiesService.setLocalities(this.config.localities);
				return this.config;
			});
	}
}