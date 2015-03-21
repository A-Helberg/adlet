import DS from "ember-data";

export default DS.Adapter.extend({
    list: function(){
      AWS.config.update({accessKeyId: '', secretAccessKey: ''});
      var s3 = new AWS.S3({region: 'us-west-2', maxRetries: 5});

      var params = {
        Bucket: 'am-testblog', /* required */
      };
      
      return new Ember.RSVP.Promise(function(resolve, reject){
        s3.listObjects(params, function(err, data) {
          if (err) reject(err); // an error occurred
          var articles = data['Contents'];
          articles.forEach(function(element, index, array){
            element['id'] = element['ETag'];
          });
          console.log(articles);

          resolve( articles );  // successful response
        });
      });
    },

    find: function (store, type, id){
      console.log(store);
      console.log(type);
      console.log(id);
      return {Key:"ho",id: 1};
    },

    findAll: function(){
      return this.list();
    }
  });