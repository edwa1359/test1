var mainpage = require('./mainpage.js');
var elements = mainpage.getElements();
var until = protractor.ExpectedConditions;


describe('angularjs homepage todo list', function() {

    beforeEach(function(done) {
        browser.ignoreSynchronization = true;
        done();
    });

    // xit('should have a title', function() {
    //     browser.get('http://juliemr.github.io/protractor-demo/');
    //
    //     expect(browser.getTitle()).toEqual('Super Calculator');
    // });

    it('should open web page', function() {
        browser.get('https://www.familysearch.org');
    //browser.pause();
        //before login
        //Free Family History and Genealogy Records — FamilySearch.org

        //after login
    browser.wait(until.presenceOf(elements.signIn), 10000, 'not there').then(function() {
        elements.signIn.click();
        browser.sleep(10000);
    });
    browser.sleep(5000).then(function() {
        browser.getTitle().then(function(title) {
            console.log(title);
        });
    });


    });

    xit('should keep session alive', function() {

    });

    //browser.sleep(1000);
    // element(by.id('lst-ib')).sendKeys('Ed Walters');
    // element(by.id('lst-ib"]')).click();



   /* var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);*/

});