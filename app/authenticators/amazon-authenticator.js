import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend({
  restore: function(options) {
    return this.refreshCredentials(options);
  },
  authenticate: function(options) {
    return this.refreshCredentials(options);
  },
  invalidate: function() {
    AWS.config.update({'accessKeyId': '', 'secretAccessKey': ''});
    return Ember.RSVP.resolve();
  },

  refreshCredentials: function(credentialObject){
    var credentials = new AWS.Credentials(credentialObject);

    return new Ember.RSVP.Promise(function(resolve, reject){
      credentials.refresh(function(err) {
        if (err) {
          reject(err);
        }
        AWS.config.update({credentials: credentials});
        resolve(credentialObject);
      });
    });
  }
});
