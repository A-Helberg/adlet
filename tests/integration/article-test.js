import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'adlet/tests/helpers/start-app';
// import Pretender from 'pretender';
// import json from '../helpers/json';

var application, server;

module('Integrations: Articles', {
  setup: function(){
    application = startApp();
  },
  teardown: function(){
    Ember.run(application, 'destroy');
  }

});

test('visiting /client-links should show a list of links', function(assert) {
  visit('/articles');
  assert.equal(find('.articles__new').text() , "New");
});
