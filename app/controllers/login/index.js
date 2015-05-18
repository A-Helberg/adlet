import Ember from 'ember';
// import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend({
  authenticator: 'authenticator:amazon-authenticator',
  actions: {
    login: function() {
      var _this = this;
      var credentials = this.getProperties('accessKeyId', 'secretAccessKey');
      debugger
      this.get('session').authenticate('authenticator:amazon-authenticator', credentials).then( function() {
          _this.transitionToRoute('articles');
        });
      console.log('login in....');
    }

  }
});
