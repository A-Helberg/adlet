import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'adlet/tests/helpers/ember-simple-auth';
import Ember from 'ember';

let s3Mock = Ember.Service.extend({
  listAll(){
    return { Contents: [
      {Key: "Article1", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]},
      {Key: "Article2", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]}
    ]};
  },
  update(id, body) {
    Ember.assert("we call update in the s3 Service with the correct id", id === "article/A new title");
    Ember.assert("we call update in the s3 Service with the correct body", body === "A new body");
    return new Ember.RSVP.Promise(function (resolve){
      resolve({Key: id, Body: [65, 32, 110, 101, 119, 32, 98, 111, 100, 121]});
    });
  },
  find() {
    Ember.assert("The full article should already be in the store, find should not be called", false);
  }
});

moduleForAcceptance('Acceptance | admin new article', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('visiting /admin/articles/new', function(assert) {
  authenticateSession(this.application, {data: "meh"});
  visit('/admin/articles/new');

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles/new');
  });

  fillIn(".admin-new-article__title", "A new title");
  fillIn(".admin-new-article__body", "A new body");

  click(".admin-new-article__save");

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles');
  });

});
