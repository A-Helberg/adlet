import DS from "ember-data";

function bin2String(uintArray) {
  var encodedString = String.fromCharCode.apply(null, uintArray),
      decodedString = decodeURIComponent((encodedString));
  return decodedString;
}

export default DS.Serializer.extend({
  normalizeResponse: function(store, type, payload, id, requestType) {
    var jsonapiPayload = {};
    if (requestType === "findAll") {
      jsonapiPayload.data = [];
      payload.forEach(function(element) {
        var resource = {};
        resource.id = element['Key'];
        resource.type = "article";
        resource.attributes = {};
        resource.attributes.body = bin2String(element['Body']);
        jsonapiPayload.data.pushObject(resource);
      });
    } else if (requestType === "find") {
      // TODO: Json-Api ify
      payload['body'] = bin2String(payload['Body']);
    }


    return jsonapiPayload;
  }
});
