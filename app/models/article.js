import DS from 'ember-data';

var Article = DS.Model.extend({
  content: DS.attr('string')
});

export default Article;