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
        //Title before login
        //Free Family History and Genealogy Records — FamilySearch.org

        //Title after login
        //FamilySearch Home — FamilySearch.org
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
//        mainpage.getSessionId();
//        console.log('SessionID: ' + mainpage.getSessionId());
        var nameEQ = "fssessionid" + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) console.log(c.substring(nameEQ.length,c.length));
        }
        console.log('this is a test');
        mainpage.keepAliveLoop();
    }, 3600000);

});