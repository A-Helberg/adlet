import Ember from 'ember';

export default Ember.Route.extend( {
  model: function() {
    return this.modelFor('article');
  },

  setupController: function(controller, model) {
    model.reload();
    controller.set('model', model);
  }
});
