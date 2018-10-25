/*
 * Created by Ed Walters 11/2017
 */

let until = protractor.ExpectedConditions;

async function waitForElementNotVisible(elementToFind) {
    browser.wait(until.invisibilityOf(elementToFind), 40000, 'Element visible');
}

async function refresh() {
    await browser.refresh();
    waitForElementNotVisible(elements.spinner);
}

let elements = {
    signIn:                   element(by.css('[class^="sign-in-link"]')),
    displayName:              element(by.css('.user-menu [data-test="NavigationUserDisplayName"]')),
    spinner:                  element(by.css('[class="fsmb-mailbox__spinner"]')),
    userButton:               element(by.css('.signedin [data-test="NavigationUserDisplayName"]'))
}

module.exports =  {
    getElements:  function() {
        return elements;
    },

    keepAliveLoop: async function (amt) {
        async function doLoop(idx) {
            if(idx < amt){
                await browser.sleep(30000); // 15 minutes = 900000
                console.log("loop times: " + (idx + 1));
                await refresh();
                await doLoop(idx + 1);
            }
        }
        await doLoop(0);
    },

    getSessionId: async function () {
        let session, cookie;
        cookie = await browser.manage().getCookie('familysearch-sessionid');
//        console.log("cookie: ", cookie);
        session = cookie.value;
//        console.log("sessionID: " + session);
//        console.log(session);
        return session;
    },

    getTime: async function(text) {
        let d = new Date();
        let h = d.getHours();
        if(h < 10){
            h = ("0" + h).slice(-2);
        }
        let m = d.getMinutes();
        if(m < 10){
            m = ("0" + m).slice(-2);
        }
        let s = d.getSeconds();
        if(s < 10) {
            s= ("0" + s).slice(-2);
        }
        let ms = d.getMilliseconds();
        await console.log(text + ": " + h + ":" + m + ":" + s + ":" + ms);
    },

    waitForElementClickable: async function(elementToFind) {
        return await browser.wait(until.elementToBeClickable(elementToFind), 40000,"Waited 40 seconds for element to be clickable");
    }


//     getSessionId: async function () {
//         let session;
//         await browser.executeScript(async function () {
//             async function readCookie(name) {
//                 let nameEQ = name + "=";
//                 let ca = document.cookie.split(';');
//                 for (let i = 0; i < ca.length; i++) {
//                     let c = ca[i];
//                     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//                     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//                 }
// //                return null;
//             }
//             async function copyToClipboard(text) {
//                 document.body.innerText = text;
//                 let range = document.createRange();
//                 await range.selectNode(document.body);
//                 await window.getSelection().addRange(range);
//                 try {
//                     let successful = document.execCommand('copy');
//                     let msg = successful ? 'successful' : 'unsuccessful';
//                     console.log("Copy email command was " + msg);
//                     console.log("SessionId: " + range);
//                     session = range;
//                 }
//                 catch(err) {
//                     console.log('Oops, unable to copy');
//                 }
//                 await window.getSelection().removeAllRanges();
//             }
//             await copyToClipboard(readCookie('fssessionid'));
//         });
//         return session;
//     }

};


// var until = protractor.ExpectedConditions;
//
// function waitForElementNotVisible(elementToFind) {
//     var dfd = protractor.promise.defer();
//     browser.wait(until.invisibilityOf(elementToFind), 40000, 'Element visible').then(function() {
//         dfd.fulfill();
//     });
//     return dfd.promise;
// }
//
// function refresh() {
//     var dfd = protractor.promise.defer();
//     browser.refresh();
//     waitForElementNotVisible(elements.spinner).then(function () {
// //        expect(elements.displayName.getText()).toMatch('Edward A Walters');
//         dfd.fulfill();
// //            browser.sleep(100);
//     });
//     return dfd.promise;
// }
//
// var elements = {
//     signIn:                     element(by.css('[class^="sign-in-link"]')),
//     displayName:              element(by.css('.user-menu [data-test="NavigationUserDisplayName"]')),
//     spinner:                  element(by.css('[class="fsmb-mailbox__spinner"]')),
//     userButton:               element(by.css('.signedin [data-test="NavigationUserDisplayName"]'))
// };
//
// module.exports =  {
//     getElements: function() {
//         return elements;
//     },
//
//     keepAliveLoop: function (amt) {
//         var dfd = protractor.promise.defer();
//         function doLoop(idx) {
//             if(idx < amt){ // set this to the number of 15 minute loops to stay alive
//                 browser.sleep(900000); // 15 minutes
//                 console.log("loop times: " + (idx + 1));
//                 refresh().then(function () {
//                     doLoop(idx + 1);
//                 });
//             }
//             else {
//                 dfd.fulfill();
//             }
//         }
//         doLoop(0);
//         return dfd.promise;
//     },
//
//     getSessionId:function () {
//         var dfd = protractor.promise.defer();
//         browser.executeScript(function () {
//             function readCookie(name) {
//                 var nameEQ = name + "=";
//                 var ca = document.cookie.split(';');
//                 for (var i = 0; i < ca.length; i++) {
//                     var c = ca[i];
//                     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//                     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//                 }
//                 return null;
//             }
//             function copyToClipboard(text) {
//                 document.body.innerText = text;
//                 var range = document.createRange();
//                 range.selectNode(document.body);
//                 window.getSelection().addRange(range);
//                 try {
//                     var successful = document.execCommand('copy');
//                     var msg = successful ? 'successful' : 'unsuccessful';
//                      console.log("Copy email command was " + msg);
//                      console.log("SessionId: " + range);
//                 }
//                 catch(err) {
//                     console.log('Oops, unable to copy');
//                 }
//                 window.getSelection().removeAllRanges();
//             }
//             copyToClipboard(readCookie('fssessionid'));
//         });
//         dfd.fulfill();
//         return dfd.promise;
//     }
//
// };
