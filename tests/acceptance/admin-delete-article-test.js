import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'adlet/tests/helpers/ember-simple-auth';
import s3Mock from 'adlet/tests/helpers/s3-mock';

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

  click(".article-edit__header__controls__delete");
});
