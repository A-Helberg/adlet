import DS from 'ember-data';

var Article = DS.Model.extend({
  body: DS.attr('string'),

  urlDecodedId: function(){
    return decodeURIComponent(this.get('id'));
  }.property('id')
});

export default Article;
