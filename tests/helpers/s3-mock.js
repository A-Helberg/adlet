import Ember from 'ember';

export default Ember.Service.extend({
  article1: {
              Key: "Article1",
              Body: [77,121,32,83,101,120,121,32,66,101,97,99,104,32,66,111,100,121,33,33,33,33]
            },
  article2: {
              Key: "Article2",
              Body: [35, 32, 104, 101, 97, 100, 105, 110, 103]
            },

  listAll(){
    return {
      Contents: [
        this.article1,
        this.article2
      ]
    };
  },
  find(id) {
    if(id === this.article1.Key) {
      return this.article1;
    } else {
      return this.article2;
    }
  },

  update (id, body) {
    let bodyArray = this.toByteArray(body);
    return new Ember.RSVP.Promise(function (resolve){
      resolve({Key: id, Body: bodyArray});
    });
  },

  delete (id) {
    return new Ember.RSVP.Promise(function (resolve){
      resolve({Key: id});
    });
  },

  toByteArray(string) {
    var utf8 = unescape(encodeURIComponent(string));

    var arr = [];
    for (var i = 0; i < utf8.length; i++) {
        arr.push(utf8.charCodeAt(i));
    }
    return arr;
  }
});

