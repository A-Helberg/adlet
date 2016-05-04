import DS from "ember-data";

export default DS.Serializer.extend({
  resource(id) {
    var resource = {};
    resource.id = id;
    resource.type = "article";
    resource.attributes = {};
    resource.relationships = {};
    resource.relationships.articleBody = {};
    resource.relationships.articleBody.data = {id: id, type: "article-body"};

    return resource;
  },

  normalizeResponse(store, type, payload, id, requestType) {
    var jsonapiPayload = {};

    if (requestType === "findAll") {
      jsonapiPayload.data = [];
      payload.Contents.forEach((element) => {
        jsonapiPayload.data.pushObject(this.resource(element.Key, element.Body));
      });
    } else {
      jsonapiPayload.data = this.resource(payload.Key, payload.Body);
    }

    return jsonapiPayload;
  }
});
