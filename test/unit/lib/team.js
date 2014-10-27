'use strict';

var sinon = require('sinon');
var assert = require('assert');
var team = require('../../../lib/team');

describe('TeamService', function () {
  var teamRepository, service;

  beforeEach(function () {
    teamRepository = {};
    service = team.createService(teamRepository);
  });

  describe('#create', function () {

    function invalidArgumentsTests(memberId, seasonId, name, callback) {
      service.create(memberId, seasonId, name, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when member id is null', function (done) {
      invalidArgumentsTests(null, 1, 'home', done);
    });

    it('should return error when member id is undefined', function (done) {
      invalidArgumentsTests(undefined, 1, 'home', done);
    });

    it('should return error when member id is a string', function (done) {
      invalidArgumentsTests('not a number', 1, 'home', done);
    });

    it('should return error when season id is null', function (done) {
      invalidArgumentsTests(1, null, 'home', done);
    });

    it('should return error when season id is undefined', function (done) {
      invalidArgumentsTests(1, undefined, 'home', done);
    });

    it('should return error when season id is a string', function (done) {
      invalidArgumentsTests(1, 'not a number', 'home', done);
    });

    it('should return error when name is null', function (done) {
      invalidArgumentsTests(1, 1, null, done);
    });

    it('should return error when name is undefined', function (done) {
      invalidArgumentsTests(1, 1, undefined, done);
    });

    it('should return error when name is empty string', function (done) {
      invalidArgumentsTests(1, 1, '', done);
    });

  });

});
