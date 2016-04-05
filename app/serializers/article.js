import DS from "ember-data";

function bin2String(uintArray) {
  var encodedString = String.fromCharCode.apply(null, uintArray),
      decodedString = decodeURIComponent((encodedString));
  return decodedString;
}

export default DS.Serializer.extend({
  resource(id, body) {
    var resource = {};
    resource.id = id;
    resource.type = "article";
    resource.attributes = {};
    resource.attributes.body = bin2String(body);
    return resource;
  },

  normalizeResponse(store, type, payload, id, requestType) {
    var jsonapiPayload = {};

    if (requestType === "findAll") {
      jsonapiPayload.data = [];
      payload.forEach((element) => {
        jsonapiPayload.data.pushObject(this.resource(element.Key, element.Body));
      });
    } else {
      jsonapiPayload.data = this.resource(payload.Key, payload.Body);
    }

    return jsonapiPayload;
  }
});
