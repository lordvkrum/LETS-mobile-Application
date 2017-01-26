import { Transaction } from '../domain/Transaction';

export const TRANSACTION: Transaction = {
	'id': '1002',
	'created': 1297373635,
	'payer': 'member/345',
	'payee': 'member/346',
	'amount': 1,
	'description': 'children\'s entertainment',
	'categories': [1, 2, 3],
	'tags': ['clowning', 'pantomime'],
	'type': 'default',
	'state': 'done',
	'canSign': false
}