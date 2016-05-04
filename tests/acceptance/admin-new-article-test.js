import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'adlet/tests/helpers/ember-simple-auth';
import s3Mock from 'adlet/tests/helpers/s3-mock';

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
