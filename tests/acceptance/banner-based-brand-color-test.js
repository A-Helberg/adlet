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
    Ember.assert("we call update in the s3 Service with the correct id", id === "A new title");
    Ember.assert("we call update in the s3 Service with the correct body", body === "A new body");
    return new Ember.RSVP.Promise(function (resolve){
      resolve({Key: id, Body: [65, 32, 110, 101, 119, 32, 98, 111, 100, 121]});
    });
  },
  find(id) {
    return new Ember.RSVP.Promise(function (resolve){
      resolve({Key: id, Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]});
    });
  }
});

moduleForAcceptance('Acceptance | brand color', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('The site calculates a brand color based on the banner', function(assert) {
  authenticateSession(this.application, {data: "meh"});
  visit('/');

  andThen(function() {
    assert.equal(this.$(".footer").find("a").css("color"), "rgb(63, 134, 136)");
  });

});
