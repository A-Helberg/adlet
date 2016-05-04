import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  body: DS.attr('string'),
  article: DS.belongsTo('article')
});
