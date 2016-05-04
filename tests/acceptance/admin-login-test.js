import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import AWS from 'npm:aws-sdk';
import s3Mock from 'adlet/tests/helpers/s3-mock';

moduleForAcceptance('Acceptance | admin login', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('visiting /admin/login', function(assert) {
  var newCredentials;
  AWS.config.update = function(params) {
    newCredentials = params;
  };

  AWS.S3.prototype.listObjects = function(params, callback) {
    callback.call(undefined, undefined, {});
  };

  visit('/admin/login');

  andThen(function() {
    assert.equal(currentURL(), '/admin/login');
  });

  fillIn(".admin-login__akid", "An Access Key ID");
  fillIn(".admin-login__sak", "A Secret Access Key");

  click(".admin-login__login");

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles');
    // This asserts that AWS.config was updated with the values entered
    assert.equal(newCredentials.credentials.accessKeyId, "An Access Key ID");
    assert.equal(newCredentials.credentials.secretAccessKey, "A Secret Access Key");
  });
});
