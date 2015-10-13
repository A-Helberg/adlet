import Ember from 'ember';
import ReadOnlyMixin from 'adlet/mixins/read-only-route';

export default Ember.Route.extend(ReadOnlyMixin, {
  model: function(params) {
    return this.store.find('article', params.article_id);
  }
});
