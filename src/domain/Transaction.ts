export class Transaction {
	[property: string]: any;
  id: string;
  created: number;
  payer: string;
	payee: string;
  amount: number;
  description: string;
  categories: Array<number>;
  tags: Array<string>;
  type: string;
  state: string;
  canSign: boolean;
}