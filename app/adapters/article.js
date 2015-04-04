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
          if (err) reject(err); // an error occurred
          var articles = data['Contents'];
          articles.forEach(function(element, index, array){
            element['id'] = element['ETag'];
          });

          resolve( articles );  // successful response
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
          if (err) reject(err); // an error occurred
          var article = data;
          article['id'] = key;

          resolve( article );  // successful response
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