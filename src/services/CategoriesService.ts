import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Category } from '../domain/Category';

@Injectable()
export class CategoriesService {
	categories = new ReplaySubject<Array<Category>>(1);

	setCategories(categories) {
		this.categories.next(categories);
	}
}