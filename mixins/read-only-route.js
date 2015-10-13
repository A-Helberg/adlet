import Ember from 'ember';
import AWS from 'npm:aws-sdk';
import config from 'adlet/config/environment';

export default Ember.Mixin.create({
  beforeModel: function() {
    var credentials = AWS.config.credentials;
    if (credentials == null || (credentials.accessKeyId == '' && credentials.secretAccessKey == '')){
        AWS.config.update({'accessKeyId': config.ReadOnlyAccessKeyID , 'secretAccessKey': config.ReadOnlySecretAccessKey});
    }
    return this._super();
  }
});
