import DS from "ember-data";

function bin2String(uintArray) {
  var encodedString = String.fromCharCode.apply(null, uintArray),
      decodedString = decodeURIComponent((encodedString));
  return decodedString;
}

export default DS.Serializer.extend({
  resource(key, body, type) {
    let resource = {};
    // Take the last section as the ID
    let id = key.substr(key.lastIndexOf("/")+1);
    resource.id = id;

    resource.type = type;
    resource.attributes = {};
    resource.attributes.key = key;
    if(body){
      resource.attributes._body = bin2String(body);
      resource.attributes._bodyHasBeenFetched = true;
    }

    return resource;
  },

  normalizeResponse(store, type, payload, id, requestType) {
    let jsonapiPayload = {};

    if (requestType === "findAll") {
      jsonapiPayload.data = [];
      payload.Contents.forEach((element) => {
        // Do not serialize the folder indicator eg. 'article/'
        if (!(element.Key === type.modelName+"/")) {
          jsonapiPayload.data.pushObject(this.resource(element.Key, element.Body, type.modelName));
        }
      });
    } else {
      if (!(payload.Key === type.modelName+"/")) {
        jsonapiPayload.data = this.resource(payload.Key, payload.Body, type.modelName);
      }
    }

    return jsonapiPayload;
  }
});
