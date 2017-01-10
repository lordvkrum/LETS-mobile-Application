export const OPTIONS_OFFER = {
  "GET": {
    "title": {
      "type": "string",
      "label": "Short name"
    },
    "description": {
      "type": "string",
      "label": "Full description"
    },
    "user_id": {
      "_comment": "defaults to the current user",
      "type": "autocomplete",
      "url": "/member?fragment=",
      "label": "Owner"
    },
    "expires": {
      "type": "date",
      "label": "Expiry date"
    },
    "id": {
      "type": "int",
      "label": "ID"
    },
    "uri": {
      "type": "uri"
    }
  },
  "POST": {
    "title": {
      "type": "string",
      "label": "Short name",
      "required": false,
      "editable": true
    },
    "description": {
      "type": "string",
      "label": "Full description",
      "required": false,
      "editable": true
    },
    "user_id": {
      "_comment": "defaults to the current user",
      "type": "autocomplete",
      "url": "/member?fragment=",
      "label": "Owner",
      "editable": false,
      "references": "member"
    },
    "expires": {
      "type": "date",
      "label": "Expiry date",
      "required": false,
      "editable": true
    }
  }
};