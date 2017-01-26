import { Config } from '../domain/Config';

export const CONFIG: Config = {
	"versions": ["0.5"],
	"restPrefix": "commex",
	"logo": "base:profiles\/cforge\/themes\/logo.gif",
	"sitename": "Hamlets Demo",
	"css": "div.example{color:red}",
	"endpoints": ["transaction",
		"member",
		"offer",
		"want"],
	"fieldTypes": {
		"tel": {
			"type": "textfield",
			"_comment": "regex to be determined"
		},
		"mail": {
			"type": "textfield",
			"regex": "^\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b$"
		},
		"member": {
			"type": "textfield",
			"autocomplete": "\/member?fields=name\u0026fragment="
		},
		"categories": { "type": "categories" },
		"locality": {
			"type": "select",
			"options": ["Apple Green",
				"Black Hills",
				"Cow Common",
				"Ditchwater",
				"Elephantine"]
		},
		"image": { "type": "file" },
		"date": { "type": "date" },
		"geo": {
			"type": ["lat",
				"lon"]
		},
		"lat": {
			"type": "textfield",
			"regex": "^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$"
		},
		"lon": {
			"type": "textfield",
			"regex": "^[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$"
		}
	},
	"categories": {
		"2": {
			"name": "Arts \u0026 Culture",
			"color": "",
			"icon": ""
		},
		"3": {
			"name": "Business Services \u0026 Clerical",
			"color": "",
			"icon": ""
		},
		"4": {
			"name": "Clothing",
			"color": "",
			"icon": ""
		},
		"5": {
			"name": "Computing \u0026 Electronics",
			"color": "",
			"icon": ""
		},
		"6": {
			"name": "Education \u0026 Language",
			"color": "",
			"icon": ""
		},
		"7": {
			"name": "Food",
			"color": "",
			"icon": ""
		},
		"8": {
			"name": "Health \u0026 Wellness",
			"color": "",
			"icon": ""
		},
		"9": {
			"name": "House \u0026 garden",
			"color": "",
			"icon": ""
		},
		"10": {
			"name": "Sports \u0026 Leisure",
			"color": "",
			"icon": ""
		},
		"11": {
			"name": "Skills \u0026 DIY",
			"color": "",
			"icon": ""
		},
		"12": {
			"name": "Transport",
			"color": "",
			"icon": ""
		},
		"13": {
			"name": "Miscellaneous",
			"color": "",
			"icon": ""
		}
	}
};