import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    delete: function() {
      var _this = this;
      this.get('model').destroyRecord().then(function() {
        _this.transitionTo('articles');
      });
    }
  }
});
