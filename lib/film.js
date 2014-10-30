'use strict';

var moment = require('moment');
var film = require('ffl-repositories').film;

function FilmService(filmRepository) {
  this.filmRepository = filmRepository;
}

FilmService.prototype.create = function (title, releaseDate, callback) {
  var me = this;

  if (!title) {
    return callback('title must be specified');
  }

  if (!releaseDate) {
    return callback('release date must be specified');
  }

  releaseDate = moment.utc(releaseDate);

  me.filmRepository.create(title, releaseDate, callback);
};

module.exports = {
  Service: FilmService,
  createService: function (filmRepository) {
    return new FilmService(filmRepository || film.createRepository());
  }
};
