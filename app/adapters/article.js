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
      params['Body'] = snapshot.get('body');

      return this.apiPromise('putObject', params);
    },

    updateRecord: function(store, type, snapshot) {
      
      var params = this.params(),
          _this  = this;
      params['Key']  = snapshot.get('id');
      params['Body'] = snapshot.get('body');
      
      if (snapshot.get('id') == snapshot.get('data.id')){
        // Body change only
        return this.apiPromise('putObject', params);  
      } else {
        // Key change

        // Should update old object
        params['Key'] = snapshot.get('data.id');

        var params2 = this.params();
        params2['CopySource'] = params2['Bucket']+"/"+snapshot.get('data.id');
        params2['Key'] = snapshot.get('id');

        var params3 = this.params();
        params3['Key'] = snapshot.get('data.id');

        return _this.apiPromise('putObject', params).then(function() {
          return _this.apiPromise('copyObject', params2).then(function() {
            return _this.apiPromise('deleteObject', params3);
          });   
        });
      }
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
