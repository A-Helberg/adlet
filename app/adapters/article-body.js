import DS from "ember-data";
import Ember from "ember";

export default DS.Adapter.extend({

  s3: Ember.inject.service(),

  findAll() {
    console.warn("You shouldn't access article bodies directly access them through Article");
    return [];
  },

  findRecord(store, type, id) {
    return this.get('s3').find(id);
  },

  updateRecord(store, type, snapshot) {
    return this.get('s3').update(snapshot.id, snapshot.attributes('body').body);
  },

  createRecord(store, type, snapshot) {
    return this.get('s3').update(snapshot.record.get('article.id'), snapshot.attributes('body').body);
  },

  deleteRecord(store, type, snapshot) {
    return this.get('s3').delete(snapshot.id);
  }
});
