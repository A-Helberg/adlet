import DS from "ember-data";
import Ember from "ember";

export default DS.Adapter.extend({

  s3: Ember.inject.service(),

  findAll: function(){
    return this.get('s3').listAll();
  }
});
