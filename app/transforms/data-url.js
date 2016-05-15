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
    let parts;
    let contentType;
    let raw;

    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      parts = dataURL.split(',');
      contentType = parts[0].split(':')[1];
      raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {type: contentType});
    }

    parts = dataURL.split(BASE64_MARKER);
    contentType = parts[0].split(':')[1];
    raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  },

  blobToDataURL(blob) {
    let base64Data = btoa(String.fromCharCode.apply(null, blob));
    return `data:;base64,${base64Data}`;
  }
});
