'use strict';

var sinon = require('sinon');
var assert = require('assert');
var user = require('../../../lib/user');

describe('UserService', function () {
  var userRepository, crypto, service;

  beforeEach(function () {
    userRepository = {};
    crypto = {};
    service = user.createService(userRepository, crypto);
  });

  describe('#findByEmail', function () {

    function invalidEmailTests(email, callback) {
      service.findByEmail(email, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when email is null', function (done) {
      invalidEmailTests(null, done);
    });

    it('should return error when email is undefined', function (done) {
      invalidEmailTests(undefined, done);
    });

    it('should return error when email is empty string', function (done) {
      invalidEmailTests('', done);
    });

    it('should sanitize email into lowercase', function (done) {
      var email = 'YELLING@email.CoM';

      userRepository.findByEmail = sinon.stub().callsArgWith(1, null);

      service.findByEmail(email, function () {
        var args = userRepository.findByEmail.args[0];
        assert.equal(args[0], 'yelling@email.com');
        done();
      });
    });

  });

});
