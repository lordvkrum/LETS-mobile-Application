import { Transaction } from '../domain/Transaction';

export const TRANSACTIONS: Array<Transaction> = [{
	'id': '1002',
	'created': 1297373635,
	'payer': 'Kerry',
	'payee': 'Paul',
	'amount': 1,
	'description': 'children\'s entertainment',
	'categories': [1, 2, 3],
	'tags': ['clowning', 'pantomime'],
	'type': 'default',
	'state': 'pending',
	'canSign': true
}, {
	'id': '1003',
	'created': 1297373635,
	'payer': 'Kerry',
	'payee': 'Paul',
	'amount': 1,
	'description': 'children\'s entertainment',
	'categories': [1, 2, 3],
	'tags': ['clowning', 'pantomime'],
	'type': 'default',
	'state': 'done',
	'canSign': false
}, {
	'id': '1004',
	'created': 1297373635,
	'payer': 'Kerry',
	'payee': 'Paul',
	'amount': 1,
	'description': 'children\'s entertainment',
	'categories': [1, 2, 3],
	'tags': ['clowning', 'pantomime'],
	'type': 'default',
	'state': 'done',
	'canSign': false
}]