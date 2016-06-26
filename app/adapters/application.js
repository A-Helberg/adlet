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
    var serializer = store.serializerFor(type.modelName);

    var serial = serializer.serialize(snapshot);
    let key = this.calculateKey(type, snapshot.id);

    let response = this.get('s3').update(key, serial._body);
    if(snapshot.record._permission) {
      response.then( () => {
        this.get('s3').setPermissions(key, snapshot.record._permission);
      });
    }
    return response;
  },

  createRecord() {
    return this.updateRecord(...arguments);
  },

  deleteRecord(store, type, snapshot) {
    return this.get('s3').delete(this.calculateKey(type, snapshot.id));
  },

  calculateKey(type, id) {
    return type.modelName+"/"+id;
  }
});
