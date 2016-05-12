import DS from "ember-data";
const { getOwner } = Ember;

export default DS.JSONSerializer.extend({
  serialize(snapshot) {
    var json = this._super(...arguments);
    return this.jsonToAmazonObject(json, snapshot);
  },
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let newPayload = {};
    switch (requestType) {
      case 'findRecord':
        newPayload = this.amazonObjectToJson(payload);
        break;
      case 'queryRecord':
        1+1;
        break;
      case 'findAll':
        newPayload = this.amazonListToJson(payload);
        break;
      case 'findBelongsTo':
        1+1;
        //TODO: Implement
        break;
      case 'findHasMany':
        1+1;
        //TODO: Implement
        break;
      case 'findMany':
        1+1;
        //TODO: Implement
        break;
      case 'query':
        break;
        //TODO: Implement
        1+1;
      case 'createRecord':
        1+1;
        newPayload = this.amazonObjectToJson(payload);
        //TODO: Implement
        break;
      case 'deleteRecord':
        1+1;
        //TODO: Implement
        break;
      case 'updateRecord':
        1+1;
        newPayload = this.amazonObjectToJson(payload);
        //TODO: Implement
        break;
    }
    var json = this._super(store, primaryModelClass, newPayload, id, requestType);
    return json;
  },
  amazonListToJson(oldPayload) {
    var payload = [];
    oldPayload.Contents.forEach((item) => {
      let key = item.Key;
      if(!(key.substring(key.length - 1, key.length) == '/')) {
        payload.pushObject(this.amazonObjectToJson(item));
      }
    });
    return payload;
  },
  amazonObjectToJson(object) {
    let key = object.Key;
    let id = key.substr(key.lastIndexOf("/")+1);
    object.id = id;
    object.key = key;
    if(object.Body) {
      object._body = object.Body;
    }
    return object;
  },
  jsonToAmazonObject(json, snapshot) {
    json.Body = json._body;
    return json;
  }
});
