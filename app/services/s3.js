import Ember from 'ember';
import AWS from 'npm:aws-sdk';

export default Ember.Service.extend({
  params: function(){
    return {
      Bucket: 'am-testblog', /* required */
    };
  },
  apiPromise: function(awsFunction, params){
    var s3 = new AWS.S3({region: 'us-west-2', maxRetries: 5});

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

  listAll: function() {
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
  }
});
