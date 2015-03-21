import Ember from 'ember';

export default Ember.Route.extend( {
  model: function(params) {
    return this.store.find('article', 1);
    var s3 = new AWS.S3({region: 'us-west-2', maxRetries: 5});

    var params = {
      Bucket: 'am-testblog', /* required */
    };
    
    return new Ember.RSVP.Promise(function(resolve, reject){
      s3.listObjects(params, function(err, data) {
        if (err) reject(err); // an error occurred
        console.log(data);
        resolve(data);  // successful response
      });
    });

  }
});
