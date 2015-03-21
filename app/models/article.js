import DS from 'ember-data';

var Article = DS.Model.extend({
  Key: DS.attr('string'),
  Body: DS.attr('string')
});

export default Article;