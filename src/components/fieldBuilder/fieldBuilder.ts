import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppSettings } from '../../app/app.settings';
import { HttpBasicAuth } from '../../services/HttpBasicAuth';
import { AlertService } from '../../services/AlertService';
import { map } from 'lodash';
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
	private autocompleteService;
	private autocompleteFragment;
	private loader: Loading

	constructor(public loadingCtrl: LoadingController,
		private settings: AppSettings,
		private httpBasicAuth: HttpBasicAuth,
		private formBuilder: FormBuilder,
		private alertService: AlertService) { }

	ngOnInit(): void {
		this.loader = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.buildForm();
	}

	buildForm() {
		let offerFormFields = {};
		let validations = [];
		this.field.$placeholder = this.field.placeholder || this.field.label + (this.field.required === true ? ' (*)' : '');
		console.log(this.field);
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
				offerFormFields[`$date${this.field.name}`] = [moment(defaultValue).format('YYYY-MM-DD')];
				break;
		}
		if (this.field.default) {
			validations.push(this.field.default);
		} else {
			validations.push(this[this.field.name]);
		}
		if (this.field.required === true) {
			validations.push(Validators.required);
			this.validationMessages.required = `${this.field.label} is required.`
		}
		offerFormFields[this.field.name] = validations;
		this.fieldForm = this.formBuilder.group(offerFormFields);
		this.fieldForm.valueChanges.subscribe(
			data => this.onValueChanged(data));
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

	parseDate(date: any) {
		let parsedDate;
		if (typeof date === 'number') {
			parsedDate = moment(date * 1000);
		} else {
			const tokens = date.split(':');
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

	autocompleteSearch(event?) {
		let target = event && (event.target || event.srcElement);
		this.autocompleteFragment = (target && target.value) || '';
		this.httpBasicAuth.getAutocomplete(this.autocompleteService, this.autocompleteFragment)
			.subscribe(
			(response: any) => {
				this.field._options = map(response, (option: any, key) => {
					option.id = key;
					return option;
				});
			},
			error => this.alertService.showError('Connection problem!')
			);
	}

}