/*
 * Created by Ed Walters 11/2017
 */
//var env = browser.testEnv;

// function sendKeys(element, keys) {
//     utils.waitForElement(element);
//     element.sendKeys(keys);
// };

// function refresh() {
//     var dfd = protractor.promise.defer();
//     browser.refresh();
//     utils.waitForElementNotVisible(elements.spinner).then(function () {
//         utils.waitForElement(elements.messageCountRead).then(function() {
//             dfd.fulfill();
// //            browser.sleep(100);
//         });
//     });
//     return dfd.promise;
// };

var elements = {
    signIn:                     element(by.css('sign-in-link fs-button fs-button--small fs-button--minor')),
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

    // deleteThread: function() {
    //     var dfd = protractor.promise.defer();
    //     utils.click(elements.deleteThreadButton);
    //     utils.waitForElementVisible(elements.deleteDialogOpened).then(function()    {
    //         browser.sleep(400); // Animation is 300ms
    //         utils.waitForElementVisible(elements.deleteDialogYesButton).then(function() {
    //             utils.click(elements.deleteDialogYesButton);
    //             utils.waitForElementNotVisible(elements.spinner).then(function () {
    //                 dfd.fulfill();
    //             });
    //         });
    //     });
    //     return dfd.promise;
    // },

    refresh: function() {
        var dfd = protractor.promise.defer();
        refresh().then(function () {
            dfd.fulfill();
        });
        return dfd.promise;
    }

    // sendReply: function(message) {
    //     utils.waitForElementVisible(elements.lastMessageBody).then(function () {
    //         sendKeys(elements.sendTextarea, message);
    //         utils.waitForElementVisible(elements.sendButton).then(function () {
    //             utils.click(elements.sendButton);
    //             utils.waitForElementNotVisible(elements.spinner).then(function () {
    //                 utils.waitForElementNotClickable(elements.sendButton);
    //             });
    //         });
    //     });
    // },
    //
    // hijackSession: function(userObj) {
    //     var cb = new Date().valueOf();
    //     var hijackUrl = env.rootUrl+'/messaging/mailbox/hijacksession?_='+cb+'&fssessionid='+userObj.fsSessionId;
    //     browser.ignoreSynchronization = true;
    //     browser.sleep(100);
    //     browser.get(hijackUrl).then (function () {
    //         utils.waitForElementNotVisible(elements.spinner).then(function () {
    //             browser.getPageSource().then(function(html) {
    //                 expect(html).toContain(userObj.displayName);
    //             });
    //         });
    //     });
    // },
    //
    // waitForMessagesVisible: function(cnt) {
    //     var dfd = protractor.promise.defer();
    //     var loop = 0;
    //     function doCheck() {
    //         utils.waitForElementVisible(elements.sendTextarea).then(function() {
    //             elements.messageCountRead.getText().then(function(amt) {
    //                 elements.messageCountUnread.getText().then(function(amtUnread) {
    //                     amt = parseInt(amt);
    //                     amtUnread = parseInt(amtUnread);
    //                     amt += amtUnread;
    //                     if(amt !== cnt && loop < 3 || loop < 1) {
    //                         browser.sleep(500);
    //                         loop ++;
    //                         doCheck();
    //                     }
    //                     else {
    //                         console.log("Waited until messages were: " + amt);
    //                         console.log("Looped times: " + (loop + 1));
    //                         dfd.fulfill(amt);
    //                     }
    //                 });
    //             });
    //         });
    //     }
    //     doCheck();
    //     return dfd.promise;
    // }
};
