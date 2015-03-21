import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('articles');
  this.resource('article', { path: 'article/:key' } );
});

export default Router;
