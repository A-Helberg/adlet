import Ember from 'ember';
import AWS from 'npm:aws-sdk';
import ENV from 'adlet/config/environment';

export default Ember.Service.extend({
  params() {
    return ENV.s3;
  },

  readOnlyKeysPresent() {
    if(!ENV.ReadOnlyAccessKeyID){
      console.error("Your do not have a read only Access Key ID configured, check your environment.");
    }
    if (!ENV.ReadOnlySecretAccessKey) {
      console.error("You do not have a read only Secret Access Key configured, check your environment.");
    }
    return (!!ENV.ReadOnlyAccessKeyID) && (!!ENV.ReadOnlySecretAccessKey);
  },

  authenticate() {
    if (this.readOnlyKeysPresent()) {
      let credentials = AWS.config.credentials;
      if (credentials == null || (credentials.accessKeyId === '' || credentials.secretAccessKey === '')){
          AWS.config.update({'accessKeyId': ENV.ReadOnlyAccessKeyID , 'secretAccessKey': ENV.ReadOnlySecretAccessKey});
      }
    }
  },

  apiPromise(awsFunction, params) {
    this.authenticate();

    var s3 = new AWS.S3(ENV.aws);

    return new Ember.RSVP.Promise(function(resolve, reject){
      var apiFunction = s3[awsFunction];
      if (apiFunction){
        apiFunction = apiFunction.bind(s3);
        apiFunction(params, function(err, data) {
          if (err) {
            reject(err);
          }
          data.Key = params.Key;
          resolve(data);
        });
      } else {
        reject("Function is not a valid AWS S3 API method.");
      }
    });
  },

  listAll() {
    var params = this.params();

    return new Ember.RSVP.Promise((resolve, reject) => {
      this.apiPromise('listObjects', params).then((data) => {
        var objects = [];
        data.Contents.forEach((object) => {
          var params = this.params();
          params.Key = object.Key;
          objects.pushObject(this.apiPromise('getObject', params));
        });
        resolve(Ember.RSVP.Promise.all(objects));
      }, (reason) => {
        reject(reason);
      });
    });
  },

  find(id) {
    var params = this.params();
    params.Key = id;
    return this.apiPromise('getObject', params);
  },

  update(id, body) {
    var params = this.params();
    params.Key = id;
    params.Body = body;
    return new Ember.RSVP.Promise( (resolve, reject) => {
      this.apiPromise('putObject', params).then(
        () => {
          this.find(id).then(
            (data) => {
              resolve(data);
            },
            (error) => { reject(error); }
          );
        },
        (error) => { reject(error); }
      );
    });
  },

  delete(id) {
    var params = this.params();
    params.Key = id;
    return this.apiPromise('deleteObject', params);
  }
});
