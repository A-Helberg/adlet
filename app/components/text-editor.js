import Ember from 'ember';

export default Ember.Component.extend({
  editor: null,
  didInsertElement(){
    ContentEdit.PREFER_LINE_BREAKS = true;
    var editor = new ContentEdit.Region(this.$(".editor")[0]);
    this.set('editor', editor);
  },
  actions: {
    save(){
      debugger
    }
  }
});
