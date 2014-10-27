'use strict';

var sinon = require('sinon');
var assert = require('assert');
var member = require('../../../lib/member');

describe('MemberService', function () {
  var memberRepository, service;

  beforeEach(function () {
    memberRepository = {};
    service = member.createService(memberRepository);
  });

  describe('#create', function () {

    function invalidArgumentsTests(userId, leagueId, isCommissioner, callback) {
      service.create(userId, leagueId, isCommissioner, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when user id is null', function (done) {
      invalidArgumentsTests(null, 1, true, done);
    });

    it('should return error when user id is undefined', function (done) {
      invalidArgumentsTests(undefined, 1, true, done);
    });

    it('should return error when user id is a string', function (done) {
      invalidArgumentsTests('not a number', 1, true, done);
    });

    it('should return error when league id is null', function (done) {
      invalidArgumentsTests(1, null, true, done);
    });

    it('should return error when league id is undefined', function (done) {
      invalidArgumentsTests(1, undefined, true, done);
    });

    it('should return error when league id is a string', function (done) {
      invalidArgumentsTests(1, 'not a number', true, done);
    });

  });

});
