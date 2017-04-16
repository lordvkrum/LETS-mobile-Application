import { Component, Input, Output, EventEmitter } from '@angular/core';
import { forEach } from 'lodash';

@Component({
	selector: 'form-builder-component',
	templateUrl: 'formBuilder.html'
})
export class FormBuilderComponent {
	private isValid: boolean = false;
	private formValue: any = {};
	@Input() fields: any;
	@Output() changed = new EventEmitter<any>();

	onValueChanged(field) {
		this.formValue[field.name] = field.value;
		this.fields[field.name].valid = field.valid;
		this.validateForm();
		this.changed.emit({ value: this.formValue, isValid: this.isValid });
	}

	validateForm() {
		let isValid = true;
		forEach(this.fields, (field: any) => isValid = isValid && field.valid);
		this.isValid = isValid;
	}
}