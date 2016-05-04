import { test } from 'qunit';
import moduleForAcceptance from 'adlet/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'adlet/tests/helpers/ember-simple-auth';
import s3Mock from 'adlet/tests/helpers/s3-mock';

moduleForAcceptance('Acceptance | Calculating Brand Color', {
  beforeEach() {
    this.application.register('service:s3Mock', s3Mock);
    this.application.inject('adapter', 's3', 'service:s3Mock');
  }
});

test('The site calculates a brand color based on the banner', function(assert) {
  authenticateSession(this.application, {data: "meh"});
  visit('/');

  andThen(function() {
    assert.equal(this.$(".footer").find("a").css("color"), "rgb(63, 134, 136)");
  });

});
