import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import s3Mock from 'adlet/tests/helpers/s3-mock';

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
    const articles = find(".articleExcerpt");
    let article1 = this.$(articles[0]);
    let article2 = this.$(articles[1]);

    assert.equal(article1.text().indexOf("Article1") !== -1, true, "The page should display Article 1");
    assert.equal(article2.text().indexOf("Article2") !== -1, true, "The page should display Article 2");
  });
});

