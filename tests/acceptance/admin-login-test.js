import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import AWS from 'npm:aws-sdk';
import Ember from 'ember';

let s3Mock = Ember.Service.extend({
  listAll(){
    return { Contents: [
      {Key: "Article1", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]},
      {Key: "Article2", Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]}
    ]};
  }
});

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

  fillIn(".login__access-key-id", "An Access Key ID");
  fillIn(".login__secret-access-key", "A Secret Access Key");

  click(".login__submit");

  andThen(function() {
    assert.equal(currentURL(), '/admin/articles');
    // This asserts that AWS.config was updated with the values entered
    assert.equal(newCredentials.credentials.accessKeyId, "An Access Key ID");
    assert.equal(newCredentials.credentials.secretAccessKey, "A Secret Access Key");
  });
});
