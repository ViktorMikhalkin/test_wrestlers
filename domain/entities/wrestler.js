'use strict';

var jsf = require('json-schema-faker');
var f = require('faker');
var chance = require('chance');
var moment = require('moment');
var _ = require('lodash');

var regions = [
    "AR Krym",
    "Vynnitska",
    "Volynska",
    "Dnipropetrovska",
    "Donetska",
    "Ghitomerska",
    "Zakarpatska",
    "Zaporizka",
    "Ivano-Frankivska",
    "Kyivska",
    "Kyrovogradska",
    "Luganska",
    "Lvivska",
    "Mykolaivska",
    "Odeska",
    "Poltavska",
    "Rivnenska",
    "Sumska",
    "Ternopilska",
    "Kharkivska",
    "Khersonska",
    "Khemlnicka",
    "Cherkaska",
    "Chernivetska",
    "Chernigivska",
    "Kyiv",
    "Sevastopol"
];

var fsts = [
    "Dinamo",
    "Kolos",
    "Ukraina",
    "Spartak",
    "MON",
    "ZSU",
    "SK"
];

var style = [
    "FS",
    "FW",
    "GR"
];

var lic_type = [
    "Junior",
    "Cadet",
    "Senior"
];

var expires = [
    "2017",
    "2016",
    "2015",
    "2014",
    "2013"
];

var WrestlerSchema = {
    type: 'object',
    properties: {
        wrestler: {
            type: 'object',
            properties: {
                id: {
                    $ref: '#/definitions/positiveInt'
                },
                lname: {
                    type: 'string',
                    faker: 'name.lastName'
                },
                fname: {
                    type: 'string',
                    faker: 'name.firstName'
                },
                dob: {
                    type: 'string',
                    faker: 'custom.dateOfBirth'
                },
                mname: {
                    type: 'string',
                    faker: 'name.firstName'
                },
                region1: {
                    type: 'string',
                    chance: {
                        "pickone": [
                            regions
                        ]
                    }
                },
                region2: {
                    type: 'string',
                    chance: {
                        "pickone": [
                            regions
                        ]
                    }
                },
                fst1: {
                    type: 'string',
                    chance: {
                        "pickone": [
                            fsts
                        ]
                    }
                },
                fst2: {
                    type: 'string',
                    chance: {
                        "pickone": [
                            fsts
                        ]
                    }
                },
                trainerid1: {
                    type: 'string',
                    faker: 'custom.trainerid1'
                },
                trainer1: {
                    type: 'string',
                    faker: 'name.findName'
                },
                trainer2: {
                    type: 'string',
                    faker: 'custom.trainerid2'
                },
                style: {
                    type: 'string',
                    chance: {
                        "pickone": [
                            style
                        ]
                    }
                },
                lic_type: {
                    type: 'string',
                    chance: {
                        "pickone": [
                            lic_type
                        ]
                    }
                },
                expires: {
                    type: 'string',
                    chance: {
                        "pickone": [
                            expires
                        ]
                    }
                },
                card_state: {
                    type: 'string',
                    faker: 'custom.card_state'
                }
            },
            required: ['id', 'lname', 'fname', 'dob', 'mname', 'region1', 'fst1', 'style', 'lic_type', 'expires']
        }
    },
    required: ['wrestler'],
    definitions: {
        positiveInt: {
            type: 'integer',
            minimum: 0,
            exclusiveMinimum: true
        }
    }
};

jsf.extend('faker', function (faker) {
    faker.custom = {
        dateOfBirth: function () {
            return moment(faker.date.between('1950-01-01', '2010-01-01')).format('DD-MM-YYYY');
        },

        trainerid1: function () {
            return faker.random.number({min:100, max:200});
        },

        trainerid2: function () {
            return faker.random.number({min:100, max:200});
        },

        card_state: function () {
            return faker.random.number({min:1, max:3});
        }
    };

    return faker;
});

var Wrestler = function (schema) {
    var wrestlerData = typeof schema !== 'undefined' ? jsf(schema).wrestler : null;

    this._id = wrestlerData !== null ? wrestlerData.id : "";
    this._lname = wrestlerData !== null ? wrestlerData.lname : "";
    this._fname = wrestlerData !== null ? wrestlerData.fname : "";
    this._dob = wrestlerData !== null ? wrestlerData.dob : "";
    this._mname = wrestlerData !== null ? wrestlerData.mname : "";
    this._region1 = wrestlerData !== null ? wrestlerData.region1 : "";
    this._fst1 = wrestlerData !== null ? wrestlerData.fst1 : "";
    this._region2 = wrestlerData !== null ? wrestlerData.region2 : "";
    this._fst2 = wrestlerData !== null ? wrestlerData.fst2 : "";
    this._style = wrestlerData !== null ? wrestlerData.style : "";
    this._lic_type = wrestlerData !== null ? wrestlerData.lic_type : "";
    this._expires = wrestlerData !== null ? wrestlerData.expires : "";
    this._card_state = wrestlerData !== null ? wrestlerData.card_state : "";
};

Wrestler.prototype.getId = function () {
    return this._id;
};

Wrestler.prototype.setId = function (id) {
    this._id = id;
};

Wrestler.prototype.getFirstName = function () {
    return this._fname;
};

Wrestler.prototype.setFirstName = function (name) {
    this._fname = name;
};

Wrestler.prototype.getMiddleName = function () {
    return this._mname;
};

Wrestler.prototype.setMiddleName = function (name) {
    this._mname = name;
};

Wrestler.prototype.getLastName = function () {
    return this._lname;
};

Wrestler.prototype.setLastName = function (name) {
    this._lname = name;
};

Wrestler.prototype.getDateOfBirth = function () {
    return this._dob;
};

Wrestler.prototype.setDateOfBirth = function (dob) {
    this._dob = dob;
};

Wrestler.prototype.getRegion1 = function () {
    return this._region1;
};

Wrestler.prototype.setRegion1 = function (region) {
    if (!isNaN(parseInt(region))) {
        this._region1 = regions[parseInt(region)-2];
    } else {
        this._region1 = region;
    }
};

Wrestler.prototype.getRegion2 = function () {
    return this._region2;
};

Wrestler.prototype.setRegion2 = function (region) {
    if (!isNaN(parseInt(region))) {
        this._region2 = regions[parseInt(region)];
    } else {
        this._region2 = region;
    }
};

Wrestler.prototype.getFst1 = function () {
    return this._fst1;
};

Wrestler.prototype.setFst1 = function (fst) {
    if (!isNaN(parseInt(fst))) {
        this._fst1 = fsts[parseInt(fst)-2];
    } else {
        this._fst1 = fst;
    }
};

Wrestler.prototype.getFst2 = function () {
    return this._fst2;
};

Wrestler.prototype.setFst2 = function (fst) {
    if (!isNaN(parseInt(fst_val))) {
        this._fst2 = fsts[parseInt(fst)];
    } else {
        this._fst2 = fst;
    }
};

Wrestler.prototype.getStyle = function () {
    return this._style;
};

Wrestler.prototype.setStyle = function (style) {
    switch (style) {
        case '1': this._style = 'FS'; break;
        case '2': this._style = 'FW'; break;
        case '3': this._style = 'GR'; break;
        default:
            this._style = style; break;
    }
};

Wrestler.prototype.getLicType = function () {
    return this._lic_type;
};

Wrestler.prototype.setLicType = function (lic_type) {
    switch (lic_type) {
        case '1': this._lic_type = 'Junior'; break;
        case '2': this._lic_type = 'Cadet'; break;
        case '3': this._lic_type = 'Senior'; break;
        default:
            this._lic_type = lic_type; break;
    }
};

Wrestler.prototype.getExpires = function () {
    return this._expires;
};

Wrestler.prototype.setExpires = function (expires) {
    this._expires = expires;
};

Wrestler.prototype.getCardState = function () {
    return this._card_state;
};

Wrestler.prototype.setCardState = function (card_state) {
    this._card_state = card_state;
};

Wrestler.prototype.isEqual = function (wrestler) {
    var extraFields = ['_id', '_region2', '_fst2', '_card_state'];

    return _.isEqualWith(_.omit(this, extraFields), _.omit(wrestler, extraFields));
};

module.exports = {
    WrestlerSchema: WrestlerSchema,
    Wrestler: Wrestler
};