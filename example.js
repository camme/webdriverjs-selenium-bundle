// This example shows how you can run a webdriverjs client without starting a selenium server
// separately.

var webdriverjs = require("webdriverjs");
var wdjsSeleniumBundle = require("./index");

var client = webdriverjs.remote({ desiredCapabilities: { browserName: 'phantomjs' } });

client.use(wdjsSeleniumBundle({autostop: true}));

client
    .init()
    .url("https://github.com/")
    .getTitle(function(err, title) {
        console.log();
        console.log("GITHUB TITLE: %s", title);
        console.log();
    })
    .end();


