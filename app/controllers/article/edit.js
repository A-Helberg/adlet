import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var _this = this;
      this.get('model').save().then(function(article) {
        _this.transitionToRoute('article', article.get('id'));
      });
    }
  }
});
