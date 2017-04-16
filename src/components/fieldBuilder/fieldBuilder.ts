import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppSettings } from '../../app/app.settings';
import { HttpBasicAuth } from '../../services/HttpBasicAuth';
import { AlertService } from '../../services/AlertService';
import { map, forEach } from 'lodash';
import * as moment from 'moment';

@Component({
	selector: 'field-builder-component',
	templateUrl: 'fieldBuilder.html'
})
export class FieldBuilderComponent implements OnInit {
	fieldForm: FormGroup;
	@Input() field: any;
	@Output() changed = new EventEmitter<any>();
	validationMessages: any = {};
	private loader: Loading;
	private hasSelectedOption: boolean;
	private formValue: any = {};

	constructor(public loadingCtrl: LoadingController,
		private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth,
		private formBuilder: FormBuilder,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.hasSelectedOption = false;
		this.loader = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.buildForm();
	}

	buildForm() {
		let formFields = {};
		let validations = [];
		this.field.$placeholder = this.field.placeholder || this.field.label + (this.field.required === true ? ' (*)' : '');
		switch (this.field.type) {
			case 'date':
				if (this.field.min) {
					let minDate = this.parseDate(this.field.min);
					this.field.parsedMin = moment(minDate).format('YYYY-MM-DD');
				}
				if (this.field.max) {
					let maxDate = this.parseDate(this.field.max);
					this.field.parsedMax = moment(maxDate).format('YYYY-MM-DD');
				}
				let defaultValue = this.parseDate(this.field.default || this.field.min || 'today');
				this.field.default = moment(defaultValue).unix();
				formFields[`$date${this.field.name}`] = [moment(defaultValue).format('YYYY-MM-DD')];
				break;
			case 'image':
				if (this.field.default) {
					this.field.imgSrc = this.field.default;
				}
				break;
		}
		if (typeof this.field.type === 'object') {
			forEach(this.field.type, (childField) => childField.label = this.field.$placeholder);
		}
		let initValue;
		if (this.field.default) {
			initValue = this.field.default;
		} else {
			initValue = this[this.field.name];
		}
		if (this.field.disabled) {
			validations.push({
				value: initValue,
				disabled: true
			});
		} else {
			validations.push(initValue);
		}
		if (this.field.required === true) {
			validations.push(Validators.required);
			this.validationMessages.required = `${this.field.label} is required.`
		}
		formFields[this.field.name] = validations;
		this.fieldForm = this.formBuilder.group(formFields);
		this.fieldForm.valueChanges.subscribe(
			data => this.onValueChanged(data));
		this.onValueChanged(); // (re)set validation messages now
	}

	onValueChanged(data?: any) {
		if (!this.fieldForm) {
			return;
		}
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
		if (this.fieldForm.value[this.field.name]) {
			switch (this.field.type) {
				case 'select':
					if (this.field.multiple) {
						this.field.$value = map(this.fieldForm.value[this.field.name], (option: any) => this.field.options[option]).join(', ');
					} else {
						this.field.$value = this.field.options[this.fieldForm.value[this.field.name]];
					}
					break;
				case 'date':
					this.field.$value = moment(this.parseDate(this.fieldForm.value[this.field.name])).format('MMM DD, YYYY');
					break;
				default:
					this.field.$value = this.fieldForm.value[this.field.name];
			}
		}
		if (data && this.field.type === 'textfield' && this.field.autocomplete) {
			this.autocompleteSearch(this.fieldForm.value[this.field.name]);
		}
		this.changed.emit({
			name: this.field.name,
			valid: this.fieldForm.valid || this.fieldForm.value[this.field.name],
			value: this.fieldForm.value[this.field.name]
		});
	}

	parseDate(date: any) {
		let parsedDate;
		if (typeof date === 'number') {
			parsedDate = moment(date * 1000);
		} else {
			let tokens = date.split(':');
			while (tokens.length) {
				switch (tokens.shift()) {
					case 'today':
						parsedDate = moment();
						break;
					case 'add':
						if (!parsedDate) {
							parsedDate = moment();
						}
						parsedDate.add(tokens.shift(), tokens.shift());
						break;
				}
			}
		}
		return parsedDate.toDate();
	}

	addImage() {
		this.addImageToField(0); // PHOTOLIBRARY
	}

	takePhoto() {
		this.addImageToField(1); // CAMERA
	}

	addImageToField(sourceType) {
		this.loader.present();
		(<any>navigator).camera.getPicture(image => {
			this.field.imgSrc = `data:image/jpeg;base64,${image}`;
			let fieldValue = {};
			fieldValue[this.field.name] = this.field.imgSrc;
			this.fieldForm.setValue(fieldValue);
			this.loader.dismiss();
		}, error => this.loader.dismiss(), {
				destinationType: 0, // DATA_URL
				mediaType: 0, // PICTURE
				sourceType: sourceType
			});
	}

	autocompleteSearch(value) {
		if (!value) {
			this.field.$options = [];
			return;
		}
		if (this.hasSelectedOption) {
			this.hasSelectedOption = false;
			return;
		}
		this.httpBasicAuth.getAutocomplete(this.field.resource, this.field.autocomplete, value).subscribe(
			response => this.field.$options = response,
			error => this.alertService.showError(error));
	}

	selectOption(option) {
		let fieldValue = {};
		fieldValue[this.field.name] = option.value;
		this.field.$options = [];
		this.hasSelectedOption = true;
		this.fieldForm.setValue(fieldValue);
	}

	childFieldChange(childField) {
		this.formValue[childField.name] = childField.value;
		this.field.type[childField.name].valid = childField.valid;
		let isValid = this.validateChildFields();
		let formValue = [];
		forEach(this.formValue, value => formValue.push(value));
		let fieldValue = {};
		fieldValue[this.field.name] = formValue.join(':');
		this.fieldForm.setValue(fieldValue);
	}

	validateChildFields() {
		let isValid = true;
		forEach(this.field.type, (childField: any) => isValid = isValid && childField.valid);
		return isValid;
	}

}