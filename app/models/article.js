import DS from 'ember-data';

var Article = DS.Model.extend({
  key: DS.attr('string'),
  articleBody: DS.belongsTo('article-body')
});

export default Article;
