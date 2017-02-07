export const OPTIONS_TRANSACTION = {
  "POST": {
    "description": {
      "label": "Description",
      "type": "text",
      "required": true
    },
    "payer": {
      "label": "Payer",
      "type": "member",
      "required": false,
      "_comment": "defaults to the current user"
    },
    "payee": {
      "label": "Payee",
      "type": "member",
      "required": false,
      "_comment": "defaults to the current user"
    },
    "amount": {
      "label": "Amount",
      "type": "number",
      "required": true
    },
    "category": {
      "type": "categories",
      "label": "Category",
      "required": true
    }
  }
};