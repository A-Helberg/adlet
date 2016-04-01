import Ember from 'ember';

export default Ember.Controller.extend({
  id:   Ember.computed.alias('model.id'),

  actions: {
    save: function() {
      var _this = this;
      this.get('model').save().then(function() {
        _this.transitionToRoute('admin.articles');
      });
    }
  },

});
