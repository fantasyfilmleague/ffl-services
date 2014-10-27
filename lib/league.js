'use strict';

var league = require('ffl-repositories').league;

function LeagueService(leagueRepository) {
  this.leagueRepository = leagueRepository;
}

LeagueService.prototype.findById = function (id, callback) {
  var me = this;

  id = parseInt(id);

  if (isNaN(id)) {
    return callback('id must be a number');
  }

  me.leagueRepository.findById(id, callback);
};

LeagueService.prototype.create = function (founderId, name, callback) {
  var me = this;

  founderId = parseInt(founderId);

  if (isNaN(founderId)) {
    return callback('founder id must be a number');
  }

  if (!name) {
    return callback('name must be specified');
  }

  me.leagueRepository.create(founderId, name, callback);
};

module.exports = {
  Service: LeagueService,
  createService: function (leagueRepository) {
    return new LeagueService(leagueRepository || league.createRepository());
  }
}
