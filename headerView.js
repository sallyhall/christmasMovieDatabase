var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var tmpl = require('./templates');

module.exports = Backbone.View.extend({
  initialize: function () {},
  template: _.template(tmpl.header),
  render: function () {
    var markup = this.template({});
    this.$el.html(markup);
    return this;
  }
});
