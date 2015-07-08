import DS from "ember-data";

function bin2String(array) {
  var result = "";
  if (array) {
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(array[i]);
    }
  }
  return result;
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
