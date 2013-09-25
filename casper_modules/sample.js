/* jshint node:true, browser:true */

//casperjs sample.js --verbose http://www.google.com

var USERAGENT_IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
	USERAGENT_ANDROID_GALAXYS3 = 'Mozilla/5.0 (Linux; U; Android 4.1.1; ko-kr; SHW-M440S Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

var deviceInfoList = [{
    ua : USERAGENT_ANDROID_GALAXYS3,
    width : 360,
    height : 640
}];

var checkList = [{
    selector : 'title',
    fn : function () {
		var titleEl = document.querySelectorAll('title');
		if(titleEl.length > 0) {
			return titleEl[0].text;
		}
		return '';
	}
}];

var casper = require('casper').create({
	    logLevel: 'debug',
	    waitTimeout: 3000,
	    stepTimeout: 5000,
	    onError: function () {
	        this.log('[Error] onError', 'debug');
	    }
	}),
	url = casper.cli.get(0) || '',
	result = [];

casper.options.verbose = casper.cli.get('verbose') || false;

casper.start();

casper.each(deviceInfoList, function (self, obj) {
    casper.then(function () {
        self.userAgent(obj.ua);
        self.viewport(obj.width, obj.height);
    });
    
    casper.thenOpen(url).each(checkList, function (self, obj) {
        self.waitForSelector(obj.selector, function then () {
            result.push(self.evaluate(obj.fn));
        }, function timeout () {
            result.push('');
        }); 
    });
});

casper.then(function () {
    this.echo(result.join(','));
});

casper.run();

