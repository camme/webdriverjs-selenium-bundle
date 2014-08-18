// This example shows how you can run a webdriverio client without starting a selenium server
// separately.

var webdriverio = require("webdriverio");
var wdjsSeleniumBundle = require("./index");

var client = webdriverio.remote({ desiredCapabilities: { browserName: 'phantomjs' } });

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


