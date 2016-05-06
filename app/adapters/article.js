import DS from "ember-data";
import Ember from "ember";

export default DS.Adapter.extend({

  s3: Ember.inject.service(),

  findAll(store, type/*, sinceToken*/) {
    return this.get('s3').listAll({Prefix: type.modelName+"/"});
  },

  findRecord(store, type, id) {
    return this.get('s3').find(this.calculateKey(type, id));
  },

  updateRecord(store, type, snapshot) {
    return this.get('s3').update(snapshot.attributes().key, snapshot.attributes()._body);
  },

  createRecord() {
    return this.updateRecord(...arguments);
  },

  deleteRecord(store, type, snapshot) {
    return this.get('s3').delete(snapshot.attributes().key);
  },

  calculateKey(type, id) {
    return type.modelName+"/"+id;
  }
});
