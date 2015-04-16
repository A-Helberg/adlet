import Ember from 'ember';

export default Ember.Route.extend( {
  model: function(params) {
    return this.store.find('article', params.article_id);
  },

  setupController: function(controller, model) {
    model.reload();
    controller.set('model', model);
  }
});
