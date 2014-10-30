'use strict';

var assert = require('assert');
var index = require('../../index');

describe('ffl-services', function () {

  it('should export an actor service', function () {
    assert.ok(index.actor);
  });

  it('should export a cast service', function () {
    assert.ok(index.cast);
  });

  it('should export a daily film gross service', function () {
    assert.ok(index.cast);
  });

  it('should export a league service', function () {
    assert.ok(index.league);
  });

  it('should export a member service', function () {
    assert.ok(index.member);
  });

  it('should export a register service', function () {
    assert.ok(index.register);
  });

  it('should export a season service', function () {
    assert.ok(index.season);
  });

  it('should export a team service', function () {
    assert.ok(index.team);
  });

  it('should export a token service', function () {
    assert.ok(index.token);
  });

  it('should export a user service', function () {
    assert.ok(index.user);
  });

});
