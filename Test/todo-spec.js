let mainpage = require('./mainpage.js');
process.env.JOB_NAME = "Test1";
let elements = mainpage.getElements();
//let until = protractor.ExpectedConditions;
let loopTimes = 2; // number of 15 minute loops
jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;

let env = 'dev';  // dev, beta, prod

describe("### Current SessionID\n", function () {

    beforeEach(function (done) {
        browser.ignoreSynchronization = true;
        done();
    });

    it("should set env", async function () {
        if (env === 'dev') {
            env = 'https://integration.familysearch.org';
        }
        else if (env === 'beta') {
            env = 'https://beta.familysearch.org';
        }
        else {
            env = 'https://familysearch.org';
        }
    });

//     it("should set env", function () {
//         if (env === 'dev') {
//             env = 'https://integration.familysearch.org';
//         }
//         else if (env === 'beta') {
//             env = 'https://beta.familysearch.org';
//         }
//         else {
//             env = 'https://familysearch.org';
//         }
//     });
//

    it("should open web page", async function () {
        await browser.get(env);
//        await browser.wait(await until.presenceOf(elements.signIn), 40000, 'SignIn not there');
        await mainpage.waitForElementClickable(elements.signIn);
//        await browser.sleep(5000);
        await elements.signIn.click();
        await browser.sleep(11000);
        await console.log("\n Environment: ", env);
    });



//     it("should open web page", function (done) {
// //        var displayNameText;
//         browser.get(env);
//         //browser.pause();
//         browser.wait(until.presenceOf(elements.signIn), 40000, 'SignIn not there').then(function () {
//             elements.signIn.click().then(function () {
//                 browser.sleep(18000);//.then(function () {
//                 console.log("\n Environment: ", env);
//             });
//         });
//        done();
//     });

    it("should keep session alive", async function () {
        let session;
        session = await mainpage.getSessionId();
        await console.log("\n");
        await console.log(session);
        await console.log("\n");
        await mainpage.getTime("Start");
        await mainpage.keepAliveLoop(loopTimes);
        await mainpage.getTime("End");
        await console.log("\n");
    }, 7200000);

    // it("should get finish time", async function () {
    //    await mainpage.getTime("End");
    // });

//
//     it("should keep session alive", function () {
// //        jasmine.DEFAULT_TIMEOUT_INTERVAL = 3600000; //3600000 = one hour
//         mainpage.getSessionId().then(function (session) {
//             console.log(session);
//             mainpage.keepAliveLoop(loopTimes);
//         });
//
//     }, 7200000);

});

// Turn in to async/await