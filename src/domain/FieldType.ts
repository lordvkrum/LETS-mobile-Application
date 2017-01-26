export class FieldType {
	[property: string]: any;
	id?: string;
	type: string;
	regex?: string;
  _comment?: string;
  autocomplete?: string;
  options?: Array<string>;
}