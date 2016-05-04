import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'adlet/tests/helpers/ember-simple-auth';
import AWS from 'npm:aws-sdk';
import s3Mock from 'adlet/tests/helpers/s3-mock';

moduleForAcceptance('Acceptance | admin edit articles', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('visiting /admin/articles and clicking through to edit an article', function(assert) {
  authenticateSession(this.application, {data: "meh"});
  AWS.config.update = function() {
  };

  AWS.S3.prototype.listObjects = function(params, callback) {
    callback.call(undefined, undefined, {Contents: []});
  };

  visit('/admin/articles');

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles');
  });

  click(".admin-article-list__link");

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles/Article1');
  });
});

test('editing an article', function(assert) {
  authenticateSession(this.application, {data: "meh"});
  AWS.config.update = function() {};

  AWS.S3.prototype.listObjects = function(params, callback) {
    callback.call(undefined, undefined, {Contents: []});
  };

  visit('/admin/articles/Article1');

  fillIn(".article-edit__body__input", "A new body!");
  click(".article-edit__header__controls__save");

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles');
  });

});

test('editing an article shows a html preview of the articleBody', function(assert) {
  authenticateSession(this.application, {data: "meh"});
  AWS.config.update = function() {};

  AWS.S3.prototype.listObjects = function(params, callback) {
    callback.call(undefined, undefined, {Contents: []});
  };

  visit('/admin/articles/Article1');

  andThen(function() {
    assert.equal(find(".article-edit__body__preview").text().trim(), "My Sexy Beach Body!!!!");
  });

});

