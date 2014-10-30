'use strict';

var cast = require('ffl-repositories').cast;

function CastService(castRepository) {
  this.castRepository = castRepository;
}

CastService.prototype.findByFilmId = function (filmId, callback) {
  var me = this;

  filmId = parseInt(filmId);

  if (isNaN(filmId)) {
    return callback('film id must be a number');
  }

  me.castRepository.findByFilmId(filmId, callback);
};

CastService.prototype.create = function (filmId, actorId, callback) {
  var me = this;

  filmId = parseInt(filmId);

  if (isNaN(filmId)) {
    return callback('film id must be a number');
  }

  actorId = parseInt(actorId);

  if (isNaN(actorId)) {
    return callback('actor id must be a number');
  }

  me.castRepository.create(filmId, actorId, callback);
};

module.exports = {
  Service: CastService,
  createService: function (castRepository) {
    return new CastService(castRepository || cast.createRepository());
  }
};
