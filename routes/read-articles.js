import Ember from 'ember';
import ReadOnlyMixin from 'adlet/mixins/read-only-route';

export default Ember.Route.extend(ReadOnlyMixin, {
  model: function(){
    return this.store.findAll('article');
  }
});
