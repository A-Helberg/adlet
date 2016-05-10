import Ember from 'ember';

export default Ember.Service.extend({
  s3: Ember.inject.service(),
  store: Ember.inject.service(),

  settings: null,
  init() {
    this.set('settings', this.get('store').findRecord('blog', 'settings'));
  }
});
