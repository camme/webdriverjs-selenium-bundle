webdriverjs-selenium-bundle
===========================

Want to use webdriverjs without needing to start the selenium-server separately? In that case, this is a bundle for you!

It includes the latest selenium standalone server, chromedriver and
phantomjs.

## How to use

First install webdriverjs and this bindle with npm:

    npm install webdriverjs
    npm install webdriverjs-selenium-bundle

Then just use it like this:

    var webdriverjs = require("webdriverjs");
    var wdjsSeleniumBundle = require("webdriverjs-selenium-bundle");

    var client = webdriverjs.remote({ desiredCapabilities: { browserName: 'phantomjs' } });

    // autostop makes sure that the selenium server is stopped after
    // calling end().
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

This will run webdriverjs as usual, but will start the selenium server
when init() is called. 

