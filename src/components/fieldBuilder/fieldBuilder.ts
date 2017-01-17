import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/CategoriesService';
import * as moment from 'moment';
declare var $: any;

@Component({
	selector: 'field-builder-component',
	templateUrl: 'fieldBuilder.html'
})
export class FieldBuilderComponent implements OnInit, AfterViewInit {
	fieldForm: FormGroup;
	@Input() field: any;
	@Output() changed = new EventEmitter<any>();
	validationMessages: any = {};
	private categories;

	constructor(private formBuilder: FormBuilder,
		private categoriesService: CategoriesService) {
		this.categoriesService.categories.subscribe(
			response => {
				this.categories = response;
			});
	}

	ngOnInit(): void {
		this.buildForm();
	}

	ngAfterViewInit(): void {
		this.buildFields();
	}

	buildForm() {
		let offerFormFields = {};
		let validations = [this[this.field.name]];
		if (this.field.required) {
			validations.push(Validators.required);
			this.validationMessages.required = `${this.field.label} is required.`
		}
		offerFormFields[this.field.name] = validations;
		this.fieldForm = this.formBuilder.group(offerFormFields);
		this.fieldForm.valueChanges
			.subscribe(data => this.onValueChanged(data));
		this.onValueChanged(); // (re)set validation messages now
	}

	onValueChanged(data?: any) {
		if (!this.fieldForm) { return; }
		const form = this.fieldForm;
		// clear previous error message (if any)
		this.field.errors = '';
		const control = form.get(this.field.name);
		if (control && control.dirty && !control.valid) {
			const messages = this.validationMessages;
			for (const key in control.errors) {
				this.field.errors += messages[key] + ' ';
			}
		}
		this.changed.emit({
			name: this.field.name,
			valid: this.fieldForm.valid,
			value: this.fieldForm.value[this.field.name]
		});
	}

	buildFields() {
		let $field = $(`[data-field="${this.field.name}"]`);
		switch (this.field.type) {
			case 'date':
				let calendarSettings: any = {
					type: 'date',
					onChange: (value) => {
						let fieldValue = {};
						fieldValue[this.field.name] = moment(value).unix();
						this.fieldForm.setValue(fieldValue);
					}
				};
				if (this.field.min) {
					calendarSettings.minDate = this.parseDate(this.field.min);
				}
				if (this.field.max) {
					calendarSettings.maxDate = this.parseDate(this.field.max);
				}
				let $calendar = $field.parents('.ui.calendar');
				$calendar.calendar(calendarSettings);
				if (this.field.default) {
					let defaultValue = this.parseDate(this.field.default);
					$calendar.calendar('set date', defaultValue);
					let fieldValue = {};
					fieldValue[this.field.name] = moment(defaultValue).unix();
					this.fieldForm.setValue(fieldValue);
				}
				break;
			case 'categories':
				$field.parents('.ui.dropdown').dropdown({
					onChange: (value) => {
						let fieldValue = {};
						fieldValue[this.field.name] = value;
						this.fieldForm.setValue(fieldValue);
					}
				});
				break;
		}
	}

	parseDate(dateString) {
		const tokens = dateString.split(':');
		let date;
		while (tokens.length) {
			switch (tokens.shift()) {
				case 'today':
					date = moment();
					break;
				case 'add':
					if (!date) {
						date = moment();
					}
					date.add(tokens.shift(), tokens.shift());
					break;
			}
		}
		return date.toDate();
	}

	addImage() {
		(<any>navigator).camera.getPicture((image) => {
			this.field.imgSrc = image;
		});
	}

}