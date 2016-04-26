import DS from "ember-data";
import Ember from "ember";

export default DS.Adapter.extend({

  s3: Ember.inject.service(),

  findAll() {
    return this.get('s3').listAll();
  },

  findRecord(store, type, id) {
    return this.get('s3').find(id);
  },

  updateRecord(store, type, snapshot) {
    return this.get('s3').update(snapshot.id, snapshot.attributes('body').body);
  },

  createRecord(store, type, snapshot) {
    return this.get('s3').update(snapshot.id, snapshot.attributes('body').body);
  },

  deleteRecord(store, type, snapshot) {
    return this.get('s3').delete(snapshot.id);
  }
});
