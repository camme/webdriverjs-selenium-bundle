webdriverjs-selenium-bundle
===========================

Want to use [WebdriverIO](http://webdriver.io) without needing to start the selenium-server separately? In that case, this is a bundle for you!

It includes the latest selenium standalone server, chromedriver and
phantomjs.

## How to use

First install [WebdriverIO](http://webdriver.io) and this bindle with npm:

    npm install webdriverio
    npm install webdriverjs-selenium-bundle

Then just use it like this:

    var webdriverio = require("webdriverio");
    var wdjsSeleniumBundle = require("webdriverjs-selenium-bundle");

    var client = webdriverio.remote({ desiredCapabilities: { browserName: 'phantomjs' } });

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

This will run [WebdriverIO](http://webdriver.io) as usual, but will start the selenium server
when init() is called.

