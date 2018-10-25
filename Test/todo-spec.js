let mainpage = require('./mainpage.js');
process.env.JOB_NAME = "Test1";
let elements = mainpage.getElements();
//let until = protractor.ExpectedConditions;
let loopTimes = 8; // number of 15 minute loops
jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

let cookieName;
let env = 'dev';  // dev, beta, prod

describe("### Current SessionID\n", function () {

    beforeEach(function (done) {
        browser.ignoreSynchronization = true;
        done();
    });

    it("should set env", async function () {
        if (env === 'dev') {
            env = 'https://integration.familysearch.org';
            cookieName = 'fssessionid';
        }
        else if (env === 'beta') {
            env = 'https://beta.familysearch.org';
            cookieName = 'fssessionid';
        }
        else {
            env = 'https://familysearch.org';
            cookieName = 'fssessionid';
        }
    });

    it("should open web page", async function () {
        await browser.get(env);
        await mainpage.waitForElementClickable(elements.signIn);
        await elements.signIn.click();
        await browser.sleep(11000);
        await console.log("\n Environment: ", env);
    });

    it("should keep session alive", async function () {
        let session;
        session = await mainpage.getSessionId(cookieName);
        await console.log("\n");
        await console.log(session);
        await console.log("\n");
        await mainpage.getTime("Start");
        await mainpage.keepAliveLoop(loopTimes);
        await mainpage.getTime("End");
        await console.log("\n");
    }, 7200000);

});
