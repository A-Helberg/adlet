import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('admin', function() {
    this.route('login', function() {});
    this.route('articles', function() {
      this.route('new');
      this.route('edit', { path: ':article_id' });
    });
  });

  this.route('read-articles', { path: '/'}, function() {});
  this.route('read-article', { path: '/:article_id' }, function() {});
});

export default Router;
