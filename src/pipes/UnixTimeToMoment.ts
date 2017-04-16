import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'unixTimeToMoment' })
export class UnixTimeToMoment implements PipeTransform {
	transform(unixTime: string) {
		return moment(parseInt(`${unixTime}000`)).format('DD/MM/YYYY');
	}
}