import { moduleForModel, test } from 'ember-qunit';

moduleForModel('article-body', 'Unit | Model | article body', {
  // Specify the other units that are required for this test.
  needs: ['model:article']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
