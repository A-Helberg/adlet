import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      this.get('model').save().then((article) => {
        let articleBody = this.store.createRecord('articleBody');
        articleBody.set('article', article);
        articleBody.set('body', this.get('body'));
        articleBody.save()
          .then(() =>{
            this.transitionToRoute('admin.articles');
          });
      });
    }
  }
});
