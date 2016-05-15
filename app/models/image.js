import Model from 'adlet/models/article';

export default Model.extend({
  _body: DS.attr('data-url')
});
