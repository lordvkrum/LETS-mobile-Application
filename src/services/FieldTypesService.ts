import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class FieldTypesService {
	fieldTypes = new ReplaySubject<Object>(1);

	setFieldTypes(fieldTypes) {
		this.fieldTypes.next(fieldTypes);
	}
}