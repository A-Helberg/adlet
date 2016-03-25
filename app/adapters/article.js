import DS from "ember-data";
import Ember from "ember";

export default DS.Adapter.extend({

  s3: Ember.inject.service(),

  findAll(){
    return this.get('s3').listAll();
  },

  findRecord(store, type, id, snapshot){
    return this.get('s3').find(id);
  }
});
