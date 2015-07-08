import DS from "ember-data";
import UTF8 from "npm:utf-8";

function bin2String(array) {
  if (array == undefined){
    return "";
  } else {
    return UTF8.getStringFromBytes(array);
  }
}

export default DS.Serializer.extend({
  extract: function(store, type, payload, id, requestType) {
    if (requestType === "findAll") {
      payload = payload['Contents'];
      payload.forEach(function(element) {
        element['id'] = element['Key'];
        element['body'] = bin2String(element['Body']);
      });
    } else if (requestType === "find") {
      payload['body'] = bin2String(payload['Body']);
    }

    if (requestType !== 'findAll') {
      payload['id'] = id;
    }

    return payload;
  }
});
