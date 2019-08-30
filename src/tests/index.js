var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
	"spec_dir": "src/tests",
	"spec_files": [
		"**/*[sS]pec.js"
	],
	"stopSpecOnExpectationFailure": false,
	"random": false
});

jasmine.onComplete(function (passed) {
	if (passed) {
		console.log('All specs have passed');
	}
	else {
		console.log('At least one spec has failed');
	}
});

jasmine.execute();