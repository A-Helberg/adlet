import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';

let s3Mock = Ember.Service.extend({
  listAll(){
    return { Contents: [
      {Key: "Article1", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]},
      {Key: "Article2", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]}
    ]};
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
    const articles = find(".article__excerpt");
    let article1 = this.$(articles[0]);
    let article2 = this.$(articles[1]);

    assert.equal(article1.text().indexOf("Article1") !== -1, true, "The page should display Article 1");
    assert.equal(article2.text().indexOf("Article2") !== -1, true, "The page should display Article 2");
  });
});

