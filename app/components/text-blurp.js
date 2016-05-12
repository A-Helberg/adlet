import Ember from 'ember';
import downsize from 'npm:downsize';

export default Ember.Component.extend({
  tagName: 'span',
  blurp: Ember.computed('text', function() {
    return downsize(this.get('text') || "", { words: 50 });
  })
});
