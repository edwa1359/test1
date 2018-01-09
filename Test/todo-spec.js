var mainpage = require('./mainpage.js');
process.env.JOB_NAME = "Test1";
var elements = mainpage.getElements();
var until = protractor.ExpectedConditions;
var loopTimes = 4; // number of 15 minute loops
jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

env = 'beta';  // dev, beta, prod

describe("### Current SessionID\n", function() {

    beforeEach(function(done) {
        browser.ignoreSynchronization = true;
        done();
    });

    it("should set env", function () {
       if(env === 'dev'){
           env = 'https://integration.familysearch.org';
       }
       else if(env === 'beta') {
           env = 'https://beta.familysearch.org';
       }
       else {
           env = 'https://familysearch.org';
       }
    });

    it("should open web page", function(done) {
//        var displayNameText;
        browser.get(env);
        //browser.pause();
        browser.wait(until.presenceOf(elements.signIn), 40000, 'SignIn not there').then(function() {
            elements.signIn.click().then(function() {
                browser.sleep(18000);//.then(function () {
//                     browser.getTitle().then(function(title) {
//                         elements.displayName.getText().then(function (displayNameText) {
//                             console.log(displayNameText);
//                         });
//                         expect(elements.displayName.getText()).toMatch('Edward A Walters');
//                         console.log(title);
//                     });
//                 });
                console.log("\n" + env);
            });
        });
        done();
    });

    it("should keep session alive", function() {
//        jasmine.DEFAULT_TIMEOUT_INTERVAL = 3600000; //3600000 = one hour
        mainpage.getSessionId().then(function () {
//            console.log(session);
            mainpage.keepAliveLoop(loopTimes);
        });

    }, 7200000);

});