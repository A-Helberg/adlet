import DS from "ember-data";

export default DS.Adapter.extend({
    params: function(){
      return {
        Bucket: 'am-testblog', /* required */
      };
    },
    list: function(){
      AWS.config.update({accessKeyId: '', secretAccessKey: ''});
      var s3 = new AWS.S3({region: 'us-west-2', maxRetries: 5});

      var params = this.params();

      return new Ember.RSVP.Promise(function(resolve, reject){
        s3.listObjects(params, function(err, data) {
          if (err) {
            reject(err);
          } // an error occurred
          resolve( data );  // successful response
        });
      });
    },

    getArticle: function(key){
      AWS.config.update({accessKeyId: '', secretAccessKey: ''});
      var s3 = new AWS.S3({region: 'us-west-2', maxRetries: 5});

      var params = this.params();
      params['Key'] = key;

      return new Ember.RSVP.Promise(function(resolve, reject){
        s3.getObject(params, function(err, data) {
          if (err) {
            reject(err); // an error occurred
          }
          resolve( data );  // successful response
        });
      });
    },

    createRecord: function(store, type, snapshot) {
      AWS.config.update({accessKeyId: '', secretAccessKey: ''});
      var s3 = new AWS.S3({region: 'us-west-2', maxRetries: 5});

      var params = this.params();
      params['Key']  = snapshot.get('Key');
      params['Body'] = snapshot.get('Body');


      return new Ember.RSVP.Promise(function(resolve, reject) {
        s3.putObject(params, function(err, data) {
          if (err) {
            reject(err); // an error occurred
          }
          resolve( data );  // successful response
        });
      });
    },

    find: function (store, type, id){
      return this.getArticle(id);
    },

    findAll: function(){
      return this.list();
    }
  });