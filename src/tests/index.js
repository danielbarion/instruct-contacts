var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
	"spec_dir": "src/tests",
	"spec_files": [
		"**/*[sS]pec.js"
	],
	"helpers": [
		"helpers/**/*.js"
	],
	"stopSpecOnExpectationFailure": false,
	"random": true
});