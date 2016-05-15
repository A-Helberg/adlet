import DS from 'ember-data';
import Ember from 'ember';

var Article = DS.Model.extend({
  s3: Ember.inject.service(),
  // The AWS Key for this Article
  key: DS.attr('string'),
  // These are private attributes used to support async fetching of an article's body
  _body: DS.attr('string'),
  _bodyHasBeenFetched: DS.attr('boolean'),
  // If not null, the permission will be set when saving the model
  _permission: null,

  body: Ember.computed('_body', {
    get () {
      if (!this.get('_bodyHasBeenFetched') && !this.get('isNew')) {
        this.store.findRecord('article', this.get('id'));
      }
      return this.get('_body');
    },
    set(key, value) {
      return this.set('_body', value);
    }
  }),

  url: Ember.computed({
    get() {
      return this.get('s3').getUrl(this.get('key'));
    }
  })
});

export default Article;
