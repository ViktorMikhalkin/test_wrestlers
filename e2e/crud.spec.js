'use strict';

var LoginPage = require('../domain/pages/LoginPage');
var HomePage = require('../domain/pages/HomePage');

var Wrestler = require('../domain/entities/wrestler').Wrestler;
var WrestlerSchema = require('../domain/entities/wrestler').WrestlerSchema;
var WrestlerService = require('../domain/services/WrestlerService');

describe('Check CRUD operations for Sportsman entity', function () {
    var loginPage = new LoginPage();
    var homePage = new HomePage();
    var wrestlerService;
    var wrestlerId;

    beforeEach(function () {
        wrestlerService = new WrestlerService();

        loginPage.go();
        loginPage.login('auto', 'test');
    });

    it('Create: a new Wrestler record should be added to DB', function () {
        var wrestler = new Wrestler(WrestlerSchema);

        homePage.addWrestler(wrestler)
            .then(function () {
                return wrestlerService.findBy(wrestler.getLastName(),
                    wrestler.getFirstName(), wrestler.getMiddleName(), wrestler.getDateOfBirth());
            })
            .then(function (wrestlerFromBackend) {
                expect((wrestlerFromBackend).isEqual(wrestler)).toBe(true);
                wrestlerId = wrestlerFromBackend.getId();
            });
    });

    it('Read: The new record should be found on Home page', function () {
        expect(homePage.findById(wrestlerId).then(function (wrestler) {
            return wrestlerService.read(wrestlerId).then(function (beWrestler) {
                return beWrestler.isEqual(wrestler);
            });
        })).toBe(true);
    });
});