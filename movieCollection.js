//movie Collection

var Backbone = require('backbone');
var MovieModel = require('./movie');

module.exports = Backbone.Collection.extend({
    url: 'http://tiny-tiny.herokuapp.com/collections/christmasMovieDatabase',
    model: MovieModel,
    initialize: function () {
    }
});
