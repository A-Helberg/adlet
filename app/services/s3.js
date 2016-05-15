import Ember from 'ember';
import AWS from 'npm:aws-sdk';
import ENV from 'adlet/config/environment';

export default Ember.Service.extend({
  params() {
    return Ember.copy(ENV.s3, true);
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
        let args = null;
        // Ensure that args is always an array
        if(params.constructor === Array) {
          args = params;
        } else {
          args = [];
          args.push(params);
        }

        let callback = function(err, data) {
          if (err) {
            reject(err);
          }

          // Ensure we always return an object with a reference to the key we queried
          let returnData = null;
          if (data === Object(data)) {
            returnData = data;
          } else {
            returnData = {};
            returnData.data = data;
          }
          returnData.Key = args[args.length - 2].Key;
          resolve(returnData);
        };

        args.push(callback);

        apiFunction.apply(s3, args);
      } else {
        reject("Function is not a valid AWS S3 API method.");
      }
    });
  },

  listAll(options) {
    var params = Ember.merge(this.params(), options);

    return new Ember.RSVP.Promise((resolve, reject) => {
      this.apiPromise('listObjects', params).then((data) => {
        resolve(data);
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
  },

  getUrl(key) {
    var params = this.params();
    params.Key = key;
    params.Expires = 1;

    return new Ember.RSVP.Promise((resolve, reject) => {
      this.apiPromise('getSignedUrl', ['getObject', params]).then((data) => {
        var parser = document.createElement('a');
        parser.href = data.data;
        let newUrl = `${parser.protocol}//${parser.host}${parser.pathname}`;
        resolve(newUrl);
      });
    });
  },

  setPermissions(id, acl) {
    var s3 = new AWS.S3(ENV.aws);

    var params = this.params();
    params.Key = id;
    // acl is defined in http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObjectAcl-property
    params.ACL = acl;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      s3.putObjectAcl(params, function(err, data) {
        if(err){ reject(err) };
        resolve(data);
      });
    });
  }
});
