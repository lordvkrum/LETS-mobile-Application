import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalitiesService {
	private localities = new Subject<Array<string>>();
	getLocalities = this.localities.asObservable();

	constructor() { }

	setLocalities(localities) {
		this.localities.next(localities);
	}
}