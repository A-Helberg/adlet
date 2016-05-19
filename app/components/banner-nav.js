import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    let nav = Ember.$('body');
    let scrolled = false;

    Ember.$(window).scroll(function () {
      if (200 < Ember.$(window).scrollTop() && !scrolled) {
        nav.addClass('fixed');
        Ember.$('.banner__header').animate({top: 0}, 0);
        scrolled = true;
      }

      if (200 > Ember.$(window).scrollTop() && scrolled) {
        nav.removeClass('fixed');
        Ember.$('.banner__header').removeAttr('style');
        scrolled = false;
      }
    });
  }
});
