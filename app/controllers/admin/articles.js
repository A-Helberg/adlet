import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    markArticleAsEditing(article) {
      this.get('model').forEach((article) => {
        article.set('isEditing', false);
      });
      article.set('isEditing', true);
    }
  }
});
