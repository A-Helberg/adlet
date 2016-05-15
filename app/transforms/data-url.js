import Transform from 'ember-data/transform';

export default Transform.extend({
  deserialize(serialized) {
    return this.blobToDataURL(serialized);
  },

  serialize(deserialized) {
    return this.dataURLToBlob(deserialized);
  },

  dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  },

  blobToDataURL(blob) {
    let base64Data = btoa(String.fromCharCode.apply(null, blob));
    return base64Data;
  }
});
