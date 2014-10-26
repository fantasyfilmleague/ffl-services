'use strict';

var moment = require('moment');
var token = require('./token');
var league = require('./league');
var email = require('ffl-email');

function InvitationService(leagueService, tokenService, emailService) {
  this.leagueService = leagueService;
  this.tokenService = tokenService;
  this.emailService = emailService;
}

InvitationService.prototype.inviteByEmails = function (leagueId, emails, callback) {
  var me = this;

  if (!emails || !emails.length) {
    return callback('emails must be specified');
  }

  me.leagueService.findById(leagueId, function (error, league) {
    if (error) {
      return callback(error);
    }

    (function loop (emails) {

      var email = emails.shift();

      if (!email) {
        return callback(null, true);
      }

      var data = {
        email: email,
        league_id: leagueId,
        expires_at: moment.utc().add(1, 'd').toISOString()
      };

      var recipient = {email: email};
      var token = me.tokenService.encrypt(data);

      me.emailService.sendInvitation(league, recipient, token, function (error) {
        if (error) {
          return callback(error);
        }

        loop(emails);
      });

    } (emails));

  });
};

InvitationService.prototype.invite = function (leagueId, email, callback) {
  var me = this;

  if (!email) {
    return callback('email must be specified');
  }

  me.inviteByEmails(leagueId, [email], callback);
};

module.exports = {
  Service: InvitationService,
  createService: function (leagueService, tokenService, emailService) {
    return new InvitationService(leagueService || league.createService(),
      tokenService || token.createService(), emailService || email);
  }
};
