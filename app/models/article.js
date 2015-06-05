import DS from 'ember-data';

var Article = DS.Model.extend({
  body: DS.attr('string')
});

export default Article;
