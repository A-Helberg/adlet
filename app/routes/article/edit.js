import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.modelFor('article');
  },

  setupController: function(controller, model) {
    model.reload();
    controller.set('model', model);
  }
});
