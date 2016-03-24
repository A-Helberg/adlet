import Ember from 'ember';
import AWS from 'npm:aws-sdk';
import ENV from 'adlet/config/environment';

export default Ember.Mixin.create({
  beforeModel: function() {
    let credentials = AWS.config.credentials;
    if (credentials == null || (credentials.accessKeyId === '' || credentials.secretAccessKey === '')){
        AWS.config.update({'accessKeyId': ENV.ReadOnlyAccessKeyID , 'secretAccessKey': ENV.ReadOnlySecretAccessKey});
    }
    return this._super();
  }
});
