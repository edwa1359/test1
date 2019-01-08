let mainpage = require('./mainpage.js');
process.env.JOB_NAME = "Test1";
jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

let elements = mainpage.getElements();
let page = 'familysearch.org/messaging/mailbox';

let minPerLoop = 15; // should not be over 15 to keep the session alive
let loopTimes = 16; // number of loops can't be greater than 16.  16 = 4 hours
let env = 'beta';  // dev, beta, prod

let loopTimes2 = 0;
let cookieName = 'fssessionid';

describe("### Current SessionID\n", function () {

    beforeEach(function (done) {
        browser.ignoreSynchronization = true;
        done();
    });

    it("should set env", async function () {
        if (env === 'dev') {
            env = 'https://integration.' + page;
        }
        else if (env === 'beta') {
            env = 'https://beta.' + page;
        }
        else {
            env = 'https://' + page;
        }
    });

    it("should open web page", async function () {
        await browser.get(env);
        await mainpage.waitForElementClickable(elements.reportAbuseButton);
        console.log("\n Environment: ", env);
    });

    it("should get session", async function () {
        let session;

        session = await mainpage.getSessionId(cookieName);
        console.log("\n");
        console.log(session);
    });

    it("should keep session alive", async function () {
        if(loopTimes > 8) {
            loopTimes2 = loopTimes - 8;
            loopTimes = loopTimes - loopTimes2;
        }

        if (loopTimes2 >8) loopTimes2 = 8;

        console.log("\n");
        await mainpage.getTime("Start");
        await mainpage.keepAliveLoop(loopTimes, minPerLoop);
    }, 7500000); //7500000 is 2 hours and 5 minutes

    it("should keep session alive stage 2", async function () {
        if(loopTimes2 > 0) {
            await mainpage.keepAliveLoop(loopTimes2, minPerLoop);
        }
        console.log("Total times looped:", loopTimes + loopTimes2);
        await mainpage.getTime("End");
    }, 7500000); //7500000 is 2 hours and 5 minutes

});
