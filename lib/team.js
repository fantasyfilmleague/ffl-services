'use strict';

var moment = require('moment');
var team = require('ffl-repositories').team;

function TeamService(teamRepository) {
  this.teamRepository = teamRepository;
}

TeamService.prototype.create = function (ownerId, seasonId, name, callback) {
  var me = this;

  ownerId = parseInt(ownerId);

  if (isNaN(ownerId)) {
    return callback('owner id must be a number');
  }

  seasonId = parseInt(seasonId);

  if (isNaN(seasonId)) {
    return callback('season id must be a number');
  }

  if (!name) {
    return callback('name must be specified');
  }

  me.teamRepository.create(ownerId, seasonId, name, callback);
};

module.exports = {
  Service: TeamService,
  createService: function (teamRepository) {
    return new TeamService(teamRepository || team.createRepository());
  }
}
