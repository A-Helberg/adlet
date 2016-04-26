import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'adlet/tests/helpers/ember-simple-auth';
import AWS from 'npm:aws-sdk';
import Ember from 'ember';

let s3Mock = Ember.Service.extend({
  listAll(){
    return [
    {Key: "Article1", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]},
    {Key: "Article2", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]}
    ];
  },
  update(id, body) {
    Ember.assert("we call update in the s3 Service with the correct id", id === "Article1");
    Ember.assert("we call update in the s3 Service with the correct body", body === "A new body!");
    return new Ember.RSVP.Promise(function (resolve){
      resolve({Key: id, Body: [65, 32, 110, 101, 119, 32, 98, 111, 100, 121, 33]});
    });
  },
  find(id) {
    return new Ember.RSVP.Promise(function (resolve){
      resolve({Key: id, Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]});
    });
  }
});

moduleForAcceptance('Acceptance | admin edit articles', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('visiting /admin/articles and clicking through to edit an article', function(assert) {
  authenticateSession(this.application, {data: "meh"});
  AWS.config.update = function() {
  };

  AWS.S3.prototype.listObjects = function(params, callback) {
    callback.call(undefined, undefined, {Contents: []});
  };

  visit('/admin/articles');

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles');
  });

  click(".admin-article-list__link");

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles/Article2');
  });
});

test('editing an article', function(assert) {
  authenticateSession(this.application, {data: "meh"});
  AWS.config.update = function() {};

  AWS.S3.prototype.listObjects = function(params, callback) {
    callback.call(undefined, undefined, {Contents: []});
  };

  visit('/admin/articles/Article1');

  fillIn(".article-edit__body", "A new body!");
  click(".admin-article__save");

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles');
  });

});

