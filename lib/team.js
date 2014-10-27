'use strict';

var moment = require('moment');
var team = require('ffl-repositories').team;

function TeamService(teamRepository) {
  this.teamRepository = teamRepository;
}

TeamService.prototype.create = function (memberId, seasonId, name, callback) {
  var me = this;

  memberId = parseInt(memberId);

  if (isNaN(memberId)) {
    return callback('member id must be a number');
  }

  seasonId = parseInt(seasonId);

  if (isNaN(seasonId)) {
    return callback('season id must be a number');
  }

  if (!name) {
    return callback('name must be specified');
  }

  me.teamRepository.create(memberId, seasonId, name, callback);
};

module.exports = {
  Service: TeamService,
  createService: function (teamRepository) {
    return new TeamService(teamRepository || team.createRepository());
  }
}
