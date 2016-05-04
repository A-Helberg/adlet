import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import s3Mock from 'adlet/tests/helpers/s3-mock';

moduleForAcceptance('Acceptance | can read a specific article', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('we can click through to view a specific article', function(assert) {
  visit('/');


  andThen(function() {
    let article = find(".articleExcerpt")[0];
    let articleTitle = this.$(article).find(".articleExcerpt__title");

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
    let article = find(".articleExcerpt")[1];
    let articleTitle = this.$(article).find(".articleExcerpt__title");

    this.$(articleTitle).find("a").click();
  });

  andThen(function() {
    assert.equal(currentURL(), '/Article2');
    let bodyHeading = find("h1")[1];
    assert.equal($(bodyHeading).text().trim(), "heading");
  });

});

