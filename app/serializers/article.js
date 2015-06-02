import DS from "ember-data";

function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  return result;
}

export default DS.Serializer.extend({
  extract: function(store, type, payload, id, requestType) {
    if (requestType === "findAll") {
      payload = payload['Contents'];
      payload.forEach(function(element, index, array) {
        element['id'] = element['Key'];
        element['Body'] = bin2String(element['Body']);
      });
    } else if (requestType === "find") {
      payload['Key'] = id;
      payload['Body'] = bin2String(payload['Body']);
    }

    if (requestType !== 'findAll') {
      payload['id'] = id;
    }

    return payload;
  }
});
