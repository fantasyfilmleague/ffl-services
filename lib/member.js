'use strict';

var member = require('ffl-repositories').member;

function MemberService(memberRepository) {
  this.memberRepository = memberRepository;
}

MemberService.prototype.create = function (userId, leagueId, isCommissioner, callback) {
  var me = this;

  userId = parseInt(userId);

  if (isNaN(userId)) {
    return callback('user id must be a number');
  }

  leagueId = parseInt(leagueId);

  if (isNaN(leagueId)) {
    return callback('league id must be a number');
  }

  me.memberRepository.create(userId, leagueId, isCommissioner, callback);
};

module.exports = {
  Service: MemberService,
  createService: function (memberRepository) {
      return new MemberService(memberRepository || member.createRepository());
  }
};
