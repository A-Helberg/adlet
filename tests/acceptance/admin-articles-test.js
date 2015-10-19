import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'adlet/tests/helpers/start-app';


var application;

var secretAccessKey = "";
var accessKeyId = "";

module('Acceptance: Admin Articles', {
  beforeEach: function() {
    application = startApp();

  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /admin/articles', function(assert) {
  login();
  andThen(function(){
    assert.equal(currentPath(), 'admin.articles.index');
    visit('/admin/articles');

    andThen(function() {
      // assert.equal(currentPath(), 'admin.articles.index');
    });
  });
});
