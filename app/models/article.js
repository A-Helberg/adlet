import DS from 'ember-data';
import Ember from 'ember';

var Article = DS.Model.extend({
  // The AWS Key for this Article
  key: DS.attr('string'),
  articleBody: DS.belongsTo('article-body'),
  // These are private attributes used to support async fetching of an article's body
  _body: DS.attr('string'),
  _bodyHasBeenFetched: DS.attr('boolean'),

  s3: Ember.inject.service(),

  body: Ember.computed('_body', {
    get () {
      if (!this.get('_bodyHasBeenFetched')) {
        this.store.findRecord('article', this.get('id'));
      }
      return this.get('_body');
    },
    set(key, value) {
      return this.set('_body', value);
    }
  })
});

export default Article;
