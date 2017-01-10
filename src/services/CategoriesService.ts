import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Category } from '../domain/Category';

@Injectable()
export class CategoriesService {
	private categories = new Subject<Array<Category>>();
	getCategories = this.categories.asObservable();

	constructor() { }

	setCategories(categories) {
		this.categories.next(categories);
	}
}