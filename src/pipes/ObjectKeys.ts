import { Pipe, PipeTransform } from '@angular/core';
import { assign } from 'lodash';

@Pipe({ name: 'keys' })
export class ObjectKeys implements PipeTransform {
	transform(value, args: string[]): any {
		let keys = [];
		for (let key in value) {
			keys.push(assign(value[key], {
				name: key
			}));
		}
		return keys;
	}
}