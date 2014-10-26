'use strict';

var moment = require('moment');
var season = require('ffl-repositories').season;

function SeasonService(seasonRepository) {
  this.seasonRepository = seasonRepository;
}

SeasonService.prototype.create = function (leagueId, startDate, endDate, callback) {
  var me = this;

  leagueId = parseInt(leagueId);

  if (isNaN(leagueId)) {
    return callback('league id must be a number');
  }

  if (!startDate || !endDate) {
    return callback('start date and end date must be specified');
  }

  startDate = moment.utc(startDate);
  endDate = moment.utc(endDate);

  if (startDate.isAfter(endDate)) {
    return callback('start date must begin before end date');
  }

  me.seasonRepository.create(leagueId, startDate, endDate, callback);
};

module.exports = {
  Service: SeasonService,
  createService: function (seasonRepository) {
    return new SeasonService(seasonRepository || season.createRepository());
  }
}
