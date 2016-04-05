import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'adlet/tests/helpers/ember-simple-auth';
import Ember from 'ember';

let s3Mock = Ember.Service.extend({
  listAll(){
    return [
    {Key: "Article1", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]},
    {Key: "Article2", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]}
    ];
  },
  find(){
    return {Key: "Article1", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]};
  },
  delete() {
    return {Key: "Article1", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]};
  }
});

moduleForAcceptance('Acceptance | admin delete article', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('visiting /admin/articles/Article1 and deleting it', function(assert) {
  authenticateSession(this.application, {data: "meh"});
  visit('/admin/articles/Article1');

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles/Article1');
  });

  click(".admin-article__delete");
});
