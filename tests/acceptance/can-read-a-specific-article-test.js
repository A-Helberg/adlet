import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';

let s3Mock = Ember.Service.extend({
  listAll(){
    return { Contents: [
      {Key: "Article1", Body: "My Sexy Beach Body!!!!"},
      {Key: "Article2", Body: "# heading"}
    ]};
  },
  find() {
    Ember.assert("The full article should already be in the store, find should not be called", false);
  }
});

moduleForAcceptance('Acceptance | can read a specific article', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('we can click through to view a specific article', function(assert) {
  visit('/');


  andThen(function() {
    let article = find(".article__excerpt")[0];
    let articleTitle = this.$(article).find(".article__excerpt__title");

    this.$(articleTitle).find("a").click();
  });

  andThen(function() {
    assert.equal(currentURL(), '/Article1');
    assert.equal(find(".article__body").text().trim(), "My Sexy Beach Body!!!!");
  });

});

test('The article body is coverted from markdown to html', function(assert) {
  visit('/');


  andThen(function() {
    let article = find(".article__excerpt")[1];
    let articleTitle = this.$(article).find(".article__excerpt__title");

    this.$(articleTitle).find("a").click();
  });

  andThen(function() {
    assert.equal(currentURL(), '/Article2');
    let bodyHeading = find("h1")[1];
    assert.equal($(bodyHeading).text().trim(), "heading");
  });

});

