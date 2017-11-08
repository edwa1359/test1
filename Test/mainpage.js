/*
 * Created by Ed Walters 11/2017
 */
//var env = browser.testEnv;

// function sendKeys(element, keys) {
//     utils.waitForElement(element);
//     element.sendKeys(keys);
// };

var until = protractor.ExpectedConditions;


function waitForElement(elementToFind) {
    var dfd = protractor.promise.defer();
    browser.wait(until.presenceOf(elementToFind), 40000, 'Element not present').then(function() {
        dfd.fulfill();
    });
    return dfd.promise;
}

function waitForElementNotVisible(elementToFind) {
    var dfd = protractor.promise.defer();
    browser.wait(until.invisibilityOf(elementToFind), 40000, 'Element visible').then(function() {
        dfd.fulfill();
    });
    return dfd.promise;
}

function refresh() {
    var dfd = protractor.promise.defer();
    browser.refresh();
    waitForElementNotVisible(elements.spinner).then(function () {
        expect(elements.displayName.getText()).toMatch('Edward A Walters');
        dfd.fulfill();
//            browser.sleep(100);
    });
    return dfd.promise;
}

var elements = {
    signIn:                     element(by.css('[class^="sign-in-link"]')),

    contactCard:              element(by.css('[data-dialog-key="fs:contactCard"]')),
    contactCardCancel:        element(by.css('[data-dialog-key="fs:contactCard"] #cancel-button')),
    contactCardReady:         element(by.css('[data-dialog-key="fs:contactCard"][aria-busy="false"]')),
    contactCardName:          element(by.css('[data-dialog-key="fs:contactCard"] [data-test="contactName"]')),
    contactCardSendButton:    element(by.css('[data-dialog-key="fs:contactCard"] [data-test="sendButton"]')),
    deleteDialogClosed:       element(by.css('[data-dialog-key="fs:confirm"][aria-hidden="true"]')),
    deleteDialogOpened:       element(by.css('[data-dialog-key="fs:confirm"][aria-hidden="false"]')),
    deleteDialogYesButton:    element(by.css('[data-dialog-key="fs:confirm"] [data-test="ok-button"]')),
    deleteThreadButton:       element(by.css('[data-test="deleteThreadButton"]')),
    displayName:              element(by.css('.user-menu [data-test="NavigationUserDisplayName"]')),
    emptyMailbox:             element(by.css('[data-thread="emptyThread"]')),
    lastMessage:              element(by.css('[data-test^="threadid:"]:last-child')),
    lastMessageContact:       element(by.css('[data-test^="threadid:"]:last-child [data-test="messageContact"]')),
    lastMessageBody:          element(by.css('[data-test^="threadid:"]:last-child [data-test="messageBody"]')),
    loadMoreThreads:		  element(by.css('[data-test="loadMoreThreads"]')),
    mainAppDiv:               element(by.css('[data-test="mailbox-app"]')),
    messageCountRead:         element(by.css('[data-test="readCount"]')),
    messageCountUnread:       element(by.css('[data-test="unreadCount"]')),
    messageOne:				  element(by.css('[data-test="thread:0"]')),
    messageTen:				  element(by.css('[data-test="thread:9"]')),
    messageTwelve:			  element(by.css('[data-test="thread:11"]')),
    messagesUnreadText:       element(by.css('[class="fsmb-message-counts__unread"]')),
    page:                     element(by.css('.fsmb-message--content')),
    pageLoaded:               element(by.css('.fsmb-message--content:not(.isLoading)')),
    pageLoading:              element(by.css('.fsmb-message--content.isLoading')),
    reportAbuseButton:        element(by.css('[data-test="reportAbuseButton"]')),
    reportAbuseDialogCancel:  element(by.css('[data-dialog-key="fs:reportAbuse"] #cancel-button')),
    reportAbuseDialogClosed:  element(by.css('[data-dialog-key="fs:reportAbuse"][aria-hidden="true"]')),
    reportAbuseDialogOpened:  element(by.css('[data-dialog-key="fs:reportAbuse"][aria-hidden="false"]')),
    sendButton:               element(by.css('[data-test="sendButton"]')),
    sendMessageDialogOpened:  element(by.css('[data-dialog-key="fs:sendMessage"][aria-hidden="false"]')),
    sendMessageDialogClose:   element(by.css('[data-dialog-key="fs:sendMessage"] [data-test="close-button"]')),
    sendTextarea:             element(by.css('[data-test="sendTextarea"]')),
    spinner:                  element(by.css('[class="fsmb-mailbox__spinner"]')),
    threadAboutUrl:           element(by.css('[data-test="aboutUrl"]')),
    threadButton:             null,
    threadListScroll:		  '[data-test*="thread:"]',
    threadSubject:            element(by.css('[data-test="threadSubject"][data-ng-bind-html="thread.subject"]')),
    userButton:               element(by.css('.signedin [data-test="NavigationUserDisplayName"]'))
};

module.exports =  {
    getElements: function() {
        return elements;
    },

    refresh: function() {
        var dfd = protractor.promise.defer();
        refresh().then(function () {
            dfd.fulfill();
        });
        return dfd.promise;
    },

    // getCookie: function (name) {
    //     return browser.manage().getCookie(name);
    // },
    //
    // getSessionId: function () {
    //     return this.getCookie('fssessionid'.getValue());
    // },
    //
    keepAliveLoop: function () {
        var dfd = protractor.promise.defer();
        function doLoop(idx) {
            if(idx < 2){ // set this to the number of minutes you want it to stay alive
                browser.sleep(60000);
                console.log("loop times: " + (idx + 1));
                refresh().then(function () {
                    doLoop(idx + 1);
                });
            }
            else {
                dfd.fulfill();
            }
        }
        doLoop(0);
        return dfd.promise;
    },

    getSessionId:function () {
        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function copyToClipboard(text) {
            document.body.innerText = text;
            var range = document.createRange();
            range.selectNode(document.body);
            window.getSelection().addRange(range);
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copy email command was ' + msg);
            }
            catch(err) {
                console.log('Oops, unable to copy');
            }
            window.getSelection().removeAllRanges();
        }
        copyToClipboard(readCookie('fssessionid')); //added the ;
    }//();

};
