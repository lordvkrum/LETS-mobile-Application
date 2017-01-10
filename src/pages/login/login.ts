import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { ConfigService } from '../../services/ConfigService';
import { AlertService } from '../../services/AlertService';
import { HomePage } from '../home/home';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
	loginForm: FormGroup;
	private sitename: string;
	private username: string;
	private password: string;

	constructor(private navCtrl: NavController,
		private menuCtrl: MenuController,
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private configService: ConfigService,
		private alertService: AlertService) {
		this.menuCtrl.enable(false, 'app-menu');
		this.configService.getAppConfig.subscribe(
			config => {
				this.sitename = config.sitename;
			});
		this.configService.loadAppConfig();
	}

	login() {
		this.username = this.loginForm.value.username;
		this.password = this.loginForm.value.password;
		this.buildForm();
		this.authService.login(this.username, this.password)
			.subscribe(
			response => this.navCtrl.setRoot(HomePage),
			error => this.alertService.showError('Connection problem!')
			);
	}

	ngOnInit(): void {
		this.buildForm();
	}

	buildForm(): void {
		this.loginForm = this.formBuilder.group({
			'username': [this.username, Validators.required],
			'password': [this.password, Validators.required]
		});
		this.loginForm.valueChanges
			.subscribe(data => this.onValueChanged(data));
		this.onValueChanged(); // (re)set validation messages now
	}

	onValueChanged(data?: any) {
		if (!this.loginForm) { return; }
		const form = this.loginForm;
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

	formErrors = {
		'username': '',
		'password': ''
	};

	validationMessages = {
		'username': {
			'required': 'Username is required.'
		},
		'password': {
			'required': 'Password is required.'
		}
	};
}
