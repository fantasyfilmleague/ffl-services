'use strict';

var sinon = require('sinon');
var assert = require('assert');
var actor = require('../../../lib/actor');

describe('ActorService', function () {
  var actorRepository, service;

  beforeEach(function () {
    actorRepository = {};
    service = actor.createService(actorRepository);
  });

  describe('#create', function () {

    function invalidArgumentsTests(name, callback) {
      service.create(name, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when name is null', function (done) {
      invalidArgumentsTests(null, done);
    });

    it('should return error when name is undefined', function (done) {
      invalidArgumentsTests(undefined, done);
    });

    it('should return error when name is empty string', function (done) {
      invalidArgumentsTests('', done);
    });

  });

  describe('#findByName', function () {

    function invalidArgumentsTests(name, callback) {
      service.findByName(name, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when name is null', function (done) {
      invalidArgumentsTests(null, done);
    });

    it('should return error when name is undefined', function (done) {
      invalidArgumentsTests(undefined, done);
    });

    it('should return error when name is empty string', function (done) {
      invalidArgumentsTests('', done);
    });

  });

});
