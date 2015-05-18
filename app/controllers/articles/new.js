import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var _this = this;
      this.get('model').save().then(function() {
        _this.transitionToRoute('articles');
      });
    }
  }
});
