'use strict';

var moment = require('moment');
var dailyFilmGross = require('ffl-repositories').dailyFimGross;

function DailyFilmGrossService(dailyFilmGrossRepository) {
  this.dailyFilmGrossRepository = dailyFilmGrossRepository;
}

DailyFilmGrossService.prototype.findByFilmId = function (filmId, callback) {
  var me = this;
  me.dailyFilmGrossRepository.findByFilmIds([filmId], callback);
};

DailyFilmGrossService.prototype.findByFilmIds = function (filmIds, callback) {
  var me = this;
  var isInvalid = false;

  if (!filmIds || filmIds.length === 0) {
    return callback('film ids must be specified');
  }

  var films = filmIds.map(function (filmId) {
    var n = parseInt(filmId);
    isInvalid |= isNaN(n);
    return n;
  });

  if (isInvalid) {
    return callback('film ids must be numbers');
  }

  me.dailyFilmGrossRepository.findByFilmIds(films, callback);
};

DailyFilmGrossService.prototype.create = function (filmId, gross, date, callback) {
  var me = this;

  filmId = parseInt(filmId);

  if (isNaN(filmId)) {
    return callback('film id must be a number');
  }

  gross = parseInt(gross);

  if (isNaN(gross)) {
    return callback('gross must be a number');
  }

  if (!date) {
    return callback('date must be specified');
  }

  // todo: enforce date more than falsy check?
  date = moment.utc(date);

  me.dailyFilmGrossRepository.create(filmId, gross, date, callback);
};

module.exports = {
  Service: DailyFilmGrossService,
  createService: function (dailyFilmGrossRepository) {
    return new DailyFilmGrossService(dailyFilmGrossRepository || dailyFilmGross.createRepository());
  }
};
