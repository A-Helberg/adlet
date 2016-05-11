import Ember from 'ember';
import autosize from 'npm:autosize';

export default Ember.Component.extend({
  didInsertElement() {
    autosize($('textarea'));
  }
});
