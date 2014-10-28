'use strict';

var sinon = require('sinon');
var assert = require('assert');
var register = require('../../../lib/register');

describe('RegisterService', function () {
  var userService, leagueService, memberService, service;

  beforeEach(function () {
    userService = {};
    leagueService = {};
    memberService = {};
    service = register.createService(userService, leagueService, memberService);
  });

  describe('#create', function () {

    it('should return an error when creating a user fails', function (done) {
      var thrown = {broke: 'down'};
      userService.create = sinon.stub().callsArgWith(2, thrown);
      service.create('email', 'password', 'name', function (error) {
        assert.equal(thrown, error);
        done();
      });
    });

    it('should return an error when creating a league fails', function (done) {
      var user = {id: 1};
      var thrown = {broke: 'down'};
      userService.create = sinon.stub().callsArgWith(2, null, user);
      leagueService.create = sinon.stub().callsArgWith(2, thrown);
      service.create('email', 'password', 'name', function (error) {
        assert.equal(thrown, error);
        done();
      });
    });

    it('should return an error when creating a league member fails', function (done) {
      var user = {id: 1};
      var league = {id: 1};
      var thrown = {broke: 'down'};
      userService.create = sinon.stub().callsArgWith(2, null, user);
      leagueService.create = sinon.stub().callsArgWith(2, null, league);
      memberService.create = sinon.stub().callsArgWith(3, thrown);
      service.create('email', 'password', 'name', function (error) {
        assert.equal(thrown, error);
        done();
      });
    });

  });

});
