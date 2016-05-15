import Model from 'adlet/models/document';
import DS from 'ember-data';

export default Model.extend({
  name: DS.attr('string')
});
