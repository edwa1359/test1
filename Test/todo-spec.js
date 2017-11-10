var mainpage = require('./mainpage.js');
var elements = mainpage.getElements();
var until = protractor.ExpectedConditions;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;


describe('### Current SessionID\n', function() {


    beforeEach(function(done) {
        browser.ignoreSynchronization = true;
        done();
    });

    it('should open web page', function() {
//        var displayNameText;
        browser.get('https://www.familysearch.org');
        //browser.pause();
        browser.wait(until.presenceOf(elements.signIn), 40000, 'SignIn not there').then(function() {
            elements.signIn.click().then(function() {
                browser.sleep(18000).then(function () {
                    browser.getTitle().then(function(title) {
                        elements.displayName.getText().then(function (displayNameText) {
                            console.log(displayNameText);
                        });
                        expect(elements.displayName.getText()).toMatch('Edward A Walters');
                        console.log(title);
                    });
                });
            });

        });
    });

    it('should keep session alive', function() {
//        jasmine.DEFAULT_TIMEOUT_INTERVAL = 3600000; //3600000 = one hour
        mainpage.getSessionId();
        mainpage.keepAliveLoop();
    }, 3600000);

});