export const OPTIONS_OFFER = {
  "GET": {
    "title": {
      "label": "Headline",
      "type": "text"
    },
    "description": {
      "label": "Full description",
      "type": "textarea"
    },
    "user_id": {
      "label": "Owner",
      "type": "member",
      "_comment": "defaults to the current user"
    },
    "expires": {
      "label": "Display until",
      "type": "date",
      "default": "today:add:1:year",
      "min": "today:add:1:day",
      "max": "today:add:1:year"
    },
    "category": {
      "type": "categories",
      "label": "Category"
    },
    "image": {
      "type": "image",
      "label": "Image"
    },
    "id": {
      "type": "int",
      "label": "ID"
    },
    "uri": { "type": "uri" }
  },
  "POST": {
    "title": {
      "label": "Headline",
      "type": "text",
      "required": true
    },
    "description": {
      "label": "Full description",
      "type": "textarea",
      "required": false
    },
    "user_id": {
      "label": "Owner",
      "type": "member",
      "required": false,
      "_comment": "defaults to the current user"
    },
    "expires": {
      "label": "Display until",
      "type": "date",
      "default": "today:add:1:year",
      "min": "today:add:1:day",
      "max": "today:add:1:year",
      "required": false
    },
    "category": {
      "type": "categories",
      "label": "Category",
      "required": true
    },
    "image": {
      "type": "image",
      "label": "Image",
      "required": false
    }
  }
};