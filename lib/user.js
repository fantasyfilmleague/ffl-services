'use strict';

var bcrypt = require('bcrypt');
var user = require('ffl-repositories').user;

function UserService(userRepository, crypto) {
  this.crypto = crypto;
  this.userRepository = userRepository;
}

UserService.prototype.findByEmail = function (email, callback) {
  var me = this;

  if (!email) {
    return callback('an email must be specified');
  }

  // be sure to make this lowercase
  email = email.toLowerCase();

  me.userRepository.findByEmail(email, callback);
};

UserService.prototype.findByEmailAndPassword = function (email, password, callback) {
  var me = this;

  me.findByEmail(email, function (error, user) {
    if (error) {
      return callback(error);
    }

    if (!user) {
      return callback('Email not found');
    }

    me.crypto.compare(password, user.password, function (error, result) {
      if (error) {
        return callback(error);
      }

      if (!result) {
        return callback('Incorrect password');
      }

      callback(null, user);
    });
  });
};

UserService.prototype.create = function (email, password, callback) {
  var me = this;

  if (!email) {
    return callback('an email must be specified');
  }

  if (!password || password.length < 8) {
    return callback('a valid password must be specified');
  }

  // be sure to make this lowercase
  email = email.toLowerCase();

  me.findByEmail(email, function (error, user) {
    if (error) {
      return callback(error);
    }

    if (user) {
      return callback('user exists');
    }

    me.crypto.hash(password, 8, function (error, hash) {
      if (error) {
        return callback(error);
      }

      me.userRepository.create(email, hash, callback);
    });
  });
};

module.exports = {
  Service: UserService,
  createService: function (userRepository, crypto) {
    return new UserService(userRepository || user.createRepository(), crypto || bcrypt);
  }
}
