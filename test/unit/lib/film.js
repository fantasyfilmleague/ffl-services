'use strict';

var sinon = require('sinon');
var assert = require('assert');
var film = require('../../../lib/film');

describe('FilmService', function () {
  var filmRepository, service;

  beforeEach(function () {
    filmRepository = {};
    service = film.createService(filmRepository);
  });

  describe('#create', function () {

    function invalidArgumentsTests(title, releaseDate, callback) {
      service.create(title, releaseDate, function (error) {
        assert.ok(error);
        callback();
      });
    }

    it('should return error when title is null', function (done) {
      invalidArgumentsTests(null, Date.now(), done);
    });

    it('should return error when title is undefined', function (done) {
      invalidArgumentsTests(undefined, Date.now(), done);
    });

    it('should return error when title is empty string', function (done) {
      invalidArgumentsTests('', Date.now(), done);
    });

    it('should return error when release date is null', function (done) {
      invalidArgumentsTests('the bogs', null, done);
    });

    it('should return error when release date is undefined', function (done) {
      invalidArgumentsTests('the bogs', undefined, done);
    });

    it('should return error when release date is false', function (done) {
      invalidArgumentsTests('the bogs', false, done);
    });

  });

});
