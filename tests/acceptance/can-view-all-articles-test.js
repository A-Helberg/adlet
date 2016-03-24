import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';

let s3Mock = Ember.Service.extend({
  listAll(){
    return [
    {Key: "Article1", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]},
    {Key: "Article2", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]}
    ];
  }
});

moduleForAcceptance('Acceptance | can view all articles', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    var body = find(".application__content").text();
    assert.equal(body.includes("Article1"), true, "The page should display Article 1");
    assert.equal(body.includes("Article2"), true, "The page should display Article 2");
  });
});
