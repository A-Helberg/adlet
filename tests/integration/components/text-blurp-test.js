import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('text-blurp', 'Integration | Component | text blurp', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let body =   "a a a a a a a a a a " +
               "a a a a a a a a a a " +
               "a a a a a a a a a a " +
               "a a a a a a a a a a " +
               "a a a a a a a a a a " +
               "a a a a a a a a a a ";
  this.set('body', body);
  this.render(hbs`{{text-blurp text=body}}`);

  let numberOfChars = ((50*2) -1);
  assert.equal(this.$().text().trim().length, numberOfChars , "I trims the text to 50 words");

});
