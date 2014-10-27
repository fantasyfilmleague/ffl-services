'use strict';

var sinon = require('sinon');
var assert = require('assert');
var league = require('../../../lib/league');

describe('LeagueService', function () {
  var leagueRepository, service;

  beforeEach(function () {
    leagueRepository = {};
    service = league.createService(leagueRepository);
  });

  describe('#create', function () {

    function invalidArgumentsTests(founderId, name, callback) {
      service.create(founderId, name, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when founder id is null', function (done) {
      invalidArgumentsTests(null, 'justice', done);
    });

    it('should return error when founder id is undefined', function (done) {
      invalidArgumentsTests(undefined, 'justice', done);
    });

    it('should return error when founder id is a string', function (done) {
      invalidArgumentsTests('not a number', 'justice', done);
    });

    it('should return error when name is null', function (done) {
      invalidArgumentsTests(1, null, done);
    });

    it('should return error when name is undefined', function (done) {
      invalidArgumentsTests(1, undefined, done);
    });

    it('should return error when name is empty string', function (done) {
      invalidArgumentsTests(1, '', done);
    });

  });

});
