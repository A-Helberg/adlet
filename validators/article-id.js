import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {
    if (this.model.get(this.property) !== null && (this.model.get(this.property).includes('/') || this.model.get(this.property).includes('\\'))) {
      this.errors.pushObject("cannot contain / or \\");
    }
  }
});
