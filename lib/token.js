'use strict';

var crypto = require('crypto');
var env = require('ffl-utils').environment;

function TokenService(crypto, secret) {
  this.crypto = crypto;
  this.secret = secret;
}

TokenService.encrypt = function (data) {
  var me = this;
  var cipher = me.crypto.createCipher('aes-256-cbc', me.secret);
  var token = cipher.update(JSON.stringify(data), 'utf8', 'base64');
  token += cipher.final('base64');
  return token;
};

TokenService.decrypt = function (token) {
  var me = this;
  var data = null;

  try {
    var decipher = me.crypto.createDecipher('aes-256-cbc', me.secret);
    var decryptedToken = decipher.update(token, 'base64', 'utf8');
    decryptedToken += decipher.final('utf8');
    data = JSON.parse(decryptedToken);
  } catch(e) {
    data = false;
  }

  return data;
};

module.exports = {
  Service: TokenService,
  createService: function (crypt, secret) {
    return new TokenService(crypt || crypto, secret || env.SESSION_SECRET);
  }
};
