import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  authenticator: 'authenticator:amazon-authenticator',
  model: function(params){
    console.log('Im here');
    return this.store.findAll('article');
  }
});
