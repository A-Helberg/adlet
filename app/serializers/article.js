import DS from "ember-data";
import UTF8 from "npm:utf-8";

function bin2String(array) {
  if (array === undefined){
    return "";
  } else {
    return UTF8.getStringFromBytes(array);
  }
}

export default DS.Serializer.extend({
  normalizeResponse: function(store, type, payload, id, requestType) {
    var jsonapiPayload = {};

    if (requestType === "findAll") {
      payload = payload['Contents'];
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
      payload['body'] = bin2String(payload['Body']);
    }

    if (requestType !== 'findAll') {
      payload['id'] = id;
    }

    return jsonapiPayload;
  }
});
