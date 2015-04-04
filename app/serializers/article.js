import DS from "ember-data";

export default DS.Serializer.extend({
  extract: function(store, type, payload, id, requestType){
    if (requestType === "findAll"){
      payload = payload['Contents'];
      payload.forEach(function(element, index, array){
        element['id'] = element['Key'];
      });
    } else if (requestType === "find"){
      payload['id'] = id;
    }

    return payload;
  }
});
