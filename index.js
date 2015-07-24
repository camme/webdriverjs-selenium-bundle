var path = require('path');
var phantomjs = require('phantomjs');
var seleniumStandalone = require('selenium-standalone');

var phantomjsFile = phantomjs.path;
var selenium;

function startSelenium(port, done) {

    selenium = seleniumStandalone({ stdio: ['ignore', 'pipe', 'pipe'] }, ['-Dphantomjs.binary.path=' + phantomjsFile + '', '-port', port]);

    var hasRun = false;
    selenium.stdout.on('data', function (data) {
        if (data.toString().indexOf('Started org.openqa.jetty.jetty') > -1) {
            if (!hasRun) {
                hasRun = true;
                done();
            }
        }
    });

};

function killSelenium() {
    if (selenium) {
        selenium.kill();
        delete selenium;
        selenium = null;
    } else {
        console.log("ERR> Selenium not started");
    }
}

module.exports = function(options) {

    options = options || { autostop: false, port: 4444 };

    return function () {

        var self = this;

        this.addCommand('_init', this.init);

        this.addCommand('stopSelenium', function(cb) {
            killSelenium();
            cb();
        });

        this.addCommand("init", function(cb) {
            if (!selenium) {
                startSelenium(options.port, function() {
                    self._init().call(cb);
                });
            } else {
                self._init().call(cb);
            }
        });

        if (options.autostop) {

            this.addCommand('_end', this.end);
            this.addCommand("end", function(cb) {
                if (selenium) {
                    self._end().call(function(cb) {
                        killSelenium();
                        if (typeof cb == "function") {
                            cb();
                        }
                    });

                } else {
                    self._end.call(cb);
                }
            });

        }

    }

}
