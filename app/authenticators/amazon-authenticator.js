import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend({
  restore: function(options) {
    var credentials = new AWS.Credentials(options);
    return new Ember.RSVP.Promise(function(resolve, reject){
      credentials.refresh(function(err) {
        if (err) {
          console.log("!!!! Error restoring session: ", err);
          reject(err); // an error occurred
        }
        AWS.config.update({credentials: credentials});
        resolve( {options: options} );  // successful response
      });
    });
  },
  authenticate: function(options) {
    // AWS.config.update({accessKeyId: options.accessKeyId, secretAccessKey: options.secretAccessKey});
    // var s3 = new AWS.S3({region: 'us-west-2', maxRetries: 5});
    // console.log('Authenticate?', options);

    var credentials = new AWS.Credentials(options);

    return new Ember.RSVP.Promise(function(resolve, reject){
      credentials.refresh(function(err) {
        if (err) {
          reject(err); // an error occurred
        }
        AWS.config.update({credentials: credentials});
        resolve( {options: options} );  // successful response
      });
    });
  },
  invalidate: function(data) {
    console.log('Not called :(');
  }
});
