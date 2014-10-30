'use strict';

var sinon = require('sinon');
var assert = require('assert');
var dailyFilmGross = require('../../../lib/dailyFilmGross');

describe('DailyFilmGrossService', function () {
  var dailyFilmGrossRepository, service;

  beforeEach(function () {
    dailyFilmGrossRepository = {};
    service = dailyFilmGross.createService(dailyFilmGrossRepository);
  });

  describe('#create', function () {

    function invalidArgumentsTests(filmId, gross, date, callback) {
      service.create(filmId, gross, date, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when film id is null', function (done) {
      invalidArgumentsTests(null, 1, Date.now(), done);
    });

    it('should return error when film id is undefined', function (done) {
      invalidArgumentsTests(undefined, 1, Date.now(), done);
    });

    it('should return error when film id is a string', function (done) {
      invalidArgumentsTests('not a number', 1, Date.now(), done);
    });

    it('should return error when gross is null', function (done) {
      invalidArgumentsTests(1, null, Date.now(), done);
    });

    it('should return error when gross is undefined', function (done) {
      invalidArgumentsTests(1, undefined, Date.now(), done);
    });

    it('should return error when gross is a string', function (done) {
      invalidArgumentsTests(1, 'not a number', Date.now(), done);
    });

    it('should return error when date is null', function (done) {
      invalidArgumentsTests(1, 1, null, done);
    });

    it('should return error when date is undefined', function (done) {
      invalidArgumentsTests(1, 1, undefined, done);
    });

    it('should return error when date is false', function (done) {
      invalidArgumentsTests(1, 1, false, done);
    });

  });

  describe('#findByFilmIds', function () {

    function invalidArgumentsTests(filmIds, callback) {
      service.findByFilmIds(filmIds, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when film ids is null', function (done) {
      invalidArgumentsTests(null, done);
    });

    it('should return error when film ids is undefined', function (done) {
      invalidArgumentsTests(undefined, done);
    });

    it('should return error when film ids is empty array', function (done) {
      invalidArgumentsTests([], done);
    });

    it('should return error when film ids contains null', function (done) {
      invalidArgumentsTests([null, 1], done);
    });

    it('should return error when film ids contains undefined', function (done) {
      invalidArgumentsTests([1, undefined], done);
    });

    it('should return error when film ids contains a string', function (done) {
      invalidArgumentsTests(['not a number'], done);
    });

  });

});
