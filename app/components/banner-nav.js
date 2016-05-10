import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    var nav = Ember.$('body');
    let scrolled = false;

    Ember.$(window).scroll(function () {
      if (200 < $(window).scrollTop() && !scrolled) {
        nav.addClass('fixed');
        $('.banner__header').animate({top: 0}, 0);
        scrolled = true;
      }

      if (200 > $(window).scrollTop() && scrolled) {
        nav.removeClass('fixed');
        $('.banner__header').removeAttr('style');
        scrolled = false;
      }
    });
  }
});
