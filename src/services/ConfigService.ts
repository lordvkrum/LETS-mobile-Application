import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as lodash from 'lodash';
import { AppSettings } from '../app/app.settings';
import { HttpBasicAuth } from './HttpBasicAuth';
import { AlertService } from './AlertService';
import { CategoriesService } from './CategoriesService';
import { FieldTypesService } from './FieldTypesService';
import { Config } from '../domain/Config';
import { Category } from '../domain/Category';

@Injectable()
export class ConfigService {
	appConfig = new ReplaySubject<Config>(1);

	constructor(private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth,
		private alertService: AlertService,
		private categoriesService: CategoriesService,
		private fieldTypesService: FieldTypesService) {
		this.requestAppConfig().subscribe(
			response => this.appConfig.next(response)
		);
	}

	requestAppConfig(): Observable<Config> {
		return this.httpBasicAuth.get(this.settings.URL.config)
			.map(response => {
				this.categoriesService.setCategories(
					lodash.map(<any>response.categories, (category: Category, id: string) => {
						category.id = id;
						return category;
					}));
				this.fieldTypesService.setFieldTypes(response.fieldTypes);
				return response;
			});
	}
}