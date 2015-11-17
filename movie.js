// Movie Model

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'http://tiny-tiny.herokuapp.com/collections/christmasMovieDatabase',
  idAttribute: '_id',
  defaults: {
    title: 'No title provided',
    image: 'http://loremflickr.com/200/200/christmas',
    description: 'No description provided.',
    release: 1900,
    rating: 0
  },
  initialize: function () {

  }
});
