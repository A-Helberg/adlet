import Ember from 'ember';
import layout from '../templates/components/http-status';
import httpStatusName from 'npm:http-status-name';
import stringHumanize from 'npm:string-humanize';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',

  getStatusName: function() {
    this.set('statusName', stringHumanize(httpStatusName(this.get('status'))));
  }.on('init')
});
