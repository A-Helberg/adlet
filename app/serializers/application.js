import DS from "ember-data";

export default DS.JSONSerializer.extend({
  serialize() {
    var json = this._super(...arguments);
    return this.jsonToAmazonObject(json);
  },
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let newPayload = {};
    switch (requestType) {
      case 'findRecord':
        newPayload = this.amazonObjectToJson(payload);
        break;
      case 'queryRecord':
        break;
      case 'findAll':
        newPayload = this.amazonListToJson(payload);
        break;
      case 'findBelongsTo':
        //TODO: Implement
        break;
      case 'findHasMany':
        //TODO: Implement
        break;
      case 'findMany':
        //TODO: Implement
        break;
      case 'query':
        break;
        //TODO: Implement
      case 'createRecord':
        newPayload = this.amazonObjectToJson(payload);
        break;
      case 'deleteRecord':
        newPayload = payload;
        newPayload.id = id;
        break;
      case 'updateRecord':
        newPayload = this.amazonObjectToJson(payload);
        break;
    }
    var json = this._super(store, primaryModelClass, newPayload, id, requestType);
    return json;
  },
  amazonListToJson(oldPayload) {
    var payload = [];
    oldPayload.Contents.forEach((item) => {
      let key = item.Key;
      if((key.substring(key.length - 1, key.length) !== '/')) {
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
      object._bodyHasBeenFetched = true;
      object._body = object.Body;
    }
    return object;
  },
  jsonToAmazonObject(json) {
    json.Body = json._body;
    return json;
  }
});
