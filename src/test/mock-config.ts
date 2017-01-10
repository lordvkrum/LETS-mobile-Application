import { Config } from '../domain/Config';

export const CONFIG: Config = {
	'versions': '1',
	'restPath': 'commex/v1',
	'logo': 'http://example.com/logo.png',
	'sitename': 'Hour Bank',
	'payInName': 'Bill someone',
	'payOutName': 'Credit someone',
	'currency': 'Hours',
	'currencyFormat': '00:59/4Hrs',
	'currency_widget': '<div class="js-form-item form-item js-form-type-worth-form form-type-worth-form js-form-item- form-item- form-no-label"></div>',
	'css': 'div.example{color:red}',
	'types': {
		'offer': {
			'singular': 'Offer',
			'plural': 'Offers',
			'geo': 0,
			'categories': 1,
			'image': 1
		},
		'want': {
			'singular': 'Want',
			'plural': 'Wants',
			'geo': 0,
			'categories': 1,
			'image': 0
		},
		'transaction': {
			'singular': 'Transaction',
			'plural': 'Transactions',
			'geo': 0,
			'categories': 1,
			'image': 0
		},
		'event': {
			'singular': 'Event',
			'plural': 'Events',
			'geo': 0,
			'categories': 0,
			'image': 1
		},
		'notice': {
			'singular': 'Notice',
			'plural': 'Notices',
			'geo': 0,
			'categories': 0,
			'image': 0
		},
		'alert': {
			'singular': 'Alert',
			'plural': 'Alerts',
			'geo': 0,
			'categories': 0,
			'image': 1
		}
	},
	'categories': {
		'1': {
			'name': 'Food',
			'color': '#ff8',
			'icon': 'http://mysite.com/files/icons/food.gif'
		},
		'2': {
			'name': 'Transport',
			'color': '#8ff',
			'icon': 'http://mysite.com/files/icons/transport.gif'
		}
	},
	'localities': [
		'neighbourhood 1',
		'neighbourhood 2',
		'neighbourhood 3'
	]
}