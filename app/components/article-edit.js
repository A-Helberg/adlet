import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['article-edit'],

  drop(event) {
    // let types = event.dataTransfer.types;
    // todo check for url or file types
    let files = event.dataTransfer.files;
    let file = files[0];
    var reader = new FileReader();
    let image = this.get('store').createRecord('image');
    image.set('id', file.name);
    // var selection = window.getSelection();
    reader.onload = () => {
      const dataURL = reader.result;
      image.set('body', dataURL);
      image.set('_permission', 'public-read');
      image.save().then((model) => {
        let node = this.$(".article-edit__body__input")[0];
        model.get('url').then((url) => {
          //TODO: Get a name for the Image
          this.insertAtCaret(node, this.getMarkdownImageTag("My Awesome name", url));
        });
      });
    };
    reader.readAsDataURL(file);
    return false;
  },

  dragover(){
    return false;
  },

  getMarkdownImageTag(name, url) {
    return `![${name}](${url} "${name}")`;

  },

  insertAtCaret(element, value) {
    let sel;
    if (document.selection) {
      element.focus();
      sel = document.selection.createRange();
      sel.text = value;
      element.focus();
    }
    else if (element.selectionStart || element.selectionStart === '0') {
      let startPos = element.selectionStart;
      let endPos = element.selectionEnd;
      let scrollTop = element.scrollTop;
      element.value = element.value.substring(0, startPos)+value+element.value.substring(endPos,element.value.length);
      element.focus();
      element.selectionStart = startPos + value.length;
      element.selectionEnd = startPos + value.length;
      element.scrollTop = scrollTop;
    } else {
      element.value += value;
      element.focus();
    }
  }
});
