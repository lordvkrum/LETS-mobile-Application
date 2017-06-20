import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewController, NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-keywords',
	templateUrl: 'keywords.html'
})
export class KeywordsFilterPage implements OnInit {
	keywordsForm: FormGroup;
	private keywords: string;
	private title: string;
	private page: any;

	constructor(public viewCtrl: ViewController,
		private formBuilder: FormBuilder,
		private navCtrl: NavController,
		private navParams: NavParams) { }

	ngOnInit(): void {
		if (this.navParams.data) {
			this.title = this.navParams.data.title;
			this.page = this.navParams.data.page;
		}
		this.buildForm();
	}

	buildForm(): void {
		this.keywordsForm = this.formBuilder.group({
			'keywords': [this.keywords, Validators.required]
		});
		this.keywordsForm.valueChanges.subscribe(
			data => this.onValueChanged(data));
		this.onValueChanged(); // (re)set validation messages now
	}

	onValueChanged(data?: any) {
		if (!this.keywordsForm) { return; }
		const form = this.keywordsForm;
		for (const field in this.formErrors) {
			// clear previous error message (if any)
			this.formErrors[field] = '';
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + ' ';
				}
			}
		}
	}

	setFilter() {
		this.keywords = this.keywordsForm.value.keywords;
		// this.viewCtrl.dismiss();
		this.navCtrl.popToRoot();
		this.navCtrl.push(this.page, {
			filter: `&fragment=${this.keywords}`,
			filterName: `'${this.keywords}'`
		});
	}

	formErrors = {
		'keywords': ''
	};

	validationMessages = {
		'keywords': {
			'required': 'Email is required.'
		}
	};
}
