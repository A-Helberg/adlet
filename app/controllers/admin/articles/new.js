import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  id:   Ember.computed.alias('model.id'),

  actions: {
    save: function() {
      var _this = this;
      this.get('model').save().then(function() {
        _this.transitionToRoute('admin.articles');
      });
    }
  },

  validations: {
    id: {
      'article-id': true
    }
  }
});
