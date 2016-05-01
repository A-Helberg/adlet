import Base from 'ember-simple-auth/authenticators/base';
import Ember from 'ember';
import AWS from 'npm:aws-sdk';
import ENV from 'adlet/config/environment';

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
    return new Ember.RSVP.Promise(function(resolve, reject){
      AWS.config.update({credentials: credentialObject});
      var s3 = new AWS.S3(ENV.aws);
      s3.listObjects(ENV.s3, function(err){
        if(err) {
          reject(err);
        }
        resolve(credentialObject);
      });
    });
  }
});
