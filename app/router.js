import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('articles', function() {
    this.route('new');
  });
  this.resource('article', { path: 'articles/:article_id' }, function() {});
});

export default Router;
