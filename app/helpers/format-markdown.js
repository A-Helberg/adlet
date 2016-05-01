import Ember from 'ember';
import Showdown from 'npm:showdown';
var showdown = new Showdown.Converter();

export default Ember.Helper.extend({
  compute: function (arr) {
    if (!arr || !arr.length) {
        return;
    }

    var escapedhtml = '',
        markdown = arr[0] || '';

    // convert markdown to HTML

    escapedhtml = showdown.makeHtml(markdown);

    // replace script and iFrame
    escapedhtml = escapedhtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        '<pre class="js-embed-placeholder">Embedded JavaScript</pre>');
    escapedhtml = escapedhtml.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
        '<pre class="iframe-embed-placeholder">Embedded iFrame</pre>');


    return Ember.String.htmlSafe(escapedhtml);
  }
});

