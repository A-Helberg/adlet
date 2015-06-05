import DS from "ember-data";

export default DS.Adapter.extend({
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
            resolve(data);
          });
        } else {
          reject("Function is not a valid AWS S3 API method.");
        }
      });
    },

    createRecord: function(store, type, snapshot) {
      var params = this.params();
      params['Key']  = snapshot.get('id');
      params['Body'] = snapshot.get('Body');

      return this.apiPromise('putObject', params);
    },

    updateRecord: function(store, type, snapshot) {
      var params = this.params();
      params['Key']  = snapshot.get('id');
      params['Body'] = snapshot.get('Body');

      return this.apiPromise('putObject', params);
    },

    deleteRecord: function(store, type, snapshot) {
      var params = this.params();
      params['Key']  = snapshot.get('id');

      return this.apiPromise('deleteObject', params);
    },

    find: function (store, type, id){
      var params = this.params();
      params['Key'] = id;

      return this.apiPromise('getObject', params);
    },

    findAll: function(){
      var params = this.params();

      return this.apiPromise('listObjects', params);
    }
  });
