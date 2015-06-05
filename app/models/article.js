import DS from 'ember-data';

var Article = DS.Model.extend({
  Body: DS.attr('string')
});

export default Article;
