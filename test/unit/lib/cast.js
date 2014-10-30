'use strict';

var sinon = require('sinon');
var assert = require('assert');
var cast = require('../../../lib/cast');

describe('CastService', function () {
  var castRepository, service;

  beforeEach(function () {
    castRepository = {};
    service = cast.createService(castRepository);
  });

  describe('#create', function () {

    function invalidArgumentsTests(filmId, actorId, callback) {
      service.create(filmId, actorId, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when film id is null', function (done) {
      invalidArgumentsTests(null, 1, done);
    });

    it('should return error when film id is undefined', function (done) {
      invalidArgumentsTests(undefined, 1, done);
    });

    it('should return error when film id is a string', function (done) {
      invalidArgumentsTests('not a number', 1, done);
    });

    it('should return error when actor id is null', function (done) {
      invalidArgumentsTests(1, null, done);
    });

    it('should return error when actor id is undefined', function (done) {
      invalidArgumentsTests(1, undefined, done);
    });

    it('should return error when actor id is a string', function (done) {
      invalidArgumentsTests(1, 'not a number', done);
    });

  });

  describe('#findByFilmId', function () {

    function invalidArgumentsTests(filmId, callback) {
      service.findByFilmId(filmId, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when film id is null', function (done) {
      invalidArgumentsTests(null, done);
    });

    it('should return error when film id is undefined', function (done) {
      invalidArgumentsTests(undefined, done);
    });

    it('should return error when film id is a string', function (done) {
      invalidArgumentsTests('not a number', done);
    });

  });

});
