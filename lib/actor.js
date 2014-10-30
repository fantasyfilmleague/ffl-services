'use strict';

var actor = require('ffl-repositories').actor;

function ActorService(actorRepository) {
  this.actorRepository = actorRepository;
}

ActorService.prototype.findByName = function (name, callback) {
  var me = this;

  if (!name) {
    return callback('name must be specified');
  }

  me.actorRepository.findByName(name, callback);
};

ActorService.prototype.create = function (name, callback) {
  var me = this;

  if (!name) {
    return callback('name must be specified');
  }

  me.actorRepository.create(name, callback);
};

module.exports = {
  Service: ActorService,
  createService: function (actorRepository) {
    return new ActorService(actorRepository || actor.createRepository());
  }
};
