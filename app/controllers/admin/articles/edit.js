import Ember from 'ember';

export default Ember.Controller.extend({
  articlesController: Ember.inject.controller('admin.articles'),

  modelChanged: Ember.observer('model', function() {
    this.get('articlesController').send('markArticleAsEditing', this.get('model'));
  }),

  actions: {
    save() {
      this.get('model').save().then(() => {
        this.transitionToRoute('admin.articles');
      });
    },
    delete() {
      this.get('model').destroyRecord().then(() => {
        this.transitionToRoute('admin.articles');
      });
    }
  }
});
