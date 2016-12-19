'use strict';

var LoginPage = require('../domain/pages/LoginPage');
var HomePage = require('../domain/pages/HomePage');

var Wrestler = require('../domain/entities/wrestler').Wrestler;
var WrestlerSchema = require('../domain/entities/wrestler').WrestlerSchema;
var WrestlerService = require('../domain/services/WrestlerService');

var APP_URL = 'http://streamtv.net.ua/base/';

describe('Check CRUD operations for Sportsman entity', function () {
    var loginPage = new LoginPage();
    var homePage = new HomePage();
    var wrestlerService;
    var wrestlerId;

    beforeEach(function () {
        loginPage.go();
        loginPage.login('auto', 'test');

        wrestlerService = new WrestlerService(APP_URL);
        loginPage.isLoaded().then(function () {
            wrestlerService.getCookie('PHPSESSID').then(function(cookieString) {
                wrestlerService.setCookie('PHPSESSID', cookieString);
            });
        });
    });

    it('Create: A new Wrestler record should be added to DB', function () {
        var wrestler = new Wrestler(WrestlerSchema);

        expect(homePage.addWrestler(wrestler).then(function () {
            return wrestlerService.findBy(wrestler.getLastName(),
                wrestler.getFirstName(), wrestler.getMiddleName(), wrestler.getDateOfBirth());
        }).then(function (beWrestler) {
            wrestlerId = beWrestler.getId();
            return beWrestler.isEqual(wrestler);
        })).toBe(true);
    });

    it('Read: The new record should be found on Home page', function () {
        expect(homePage.findById(wrestlerId).then(function (wrestler) {
            return wrestlerService.read(wrestlerId).then(function (beWrestler) {
                return beWrestler.isEqual(wrestler);
            });
        })).toBe(true);
    });

    it('Update: An updated record should be saved to DB', function () {
        expect(homePage.findById(wrestlerId).then(function () {
            homePage.setRegion1('Zakarpatska');
            homePage.setFirstName('Ivan-Piotr');
            return homePage.save();
        }).then(function () {
            return wrestlerService.read(wrestlerId).then(function (beWrestler) {
                homePage.openMainTab();
                return homePage.findById(wrestlerId).then(function (wrestler) {
                    return beWrestler.isEqual(wrestler);
                });
            });
        })).toBe(true);
    });

    describe('Delete', function () {
        it('The record has been deleted from DB', function () {

        });

        it('The list of wrestlers on main tab should not contain a deleted record', function () {

        });
    });
});

xdescribe('endpoint', function () {
    var ws;
    var loginPage = new LoginPage();
    
    beforeAll(function () {
        loginPage.go();
        loginPage.login('auto', 'test');

        ws = new WrestlerService('http://streamtv.net.ua/base/');
        loginPage.isLoaded().then(function () {
            ws.getCookie('PHPSESSID').then(function(cookieString) {
                ws.setCookie('PHPSESSID', cookieString);
            });
        });
    });
    
    it('te', function () {
        ws.findBy('Larson', 'Schuyler', 'Joe', '09-03-1989')
            .then(function (beWrestler) {
                console.log(beWrestler.getId());
            });
    });
});