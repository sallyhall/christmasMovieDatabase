var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'article',
  className: 'movie',
  template: _.template($('#movieTmpl').html()),
  events: {
    'click .glyphicon-pencil': 'editMovieInfo',
    'click .glyphicon-trash': 'deleteMovie',
    'keypress h3': 'updateMovie',
    'keypress p': 'updateMovie'
  },
  editMovieInfo: function (e) {
    e.preventDefault();
    var movieEl = $(e.target).parents(".movie");
    var movieP = $(movieEl).find("p");
    var movieH = $(movieEl).find("h3");
    movieP.attr("contenteditable",true);
    movieH.attr("contenteditable",true);
    movieP.toggleClass("editable");
    movieH.toggleClass("editable");
  },
  updateMovie: function (e) {
    if(e.charCode===13){
      var movieEl = $(e.target).parents(".movie");
      var movieP = $(movieEl).find("p");
      var movieH = $(movieEl).find("h3");
      movieP.attr("contenteditable",false);
      movieH.attr("contenteditable",false);
      movieP.toggleClass("editable");
      movieH.toggleClass("editable");
      var movie = this.model;
      var title = movieH.text().trim();
      var plot =movieEl.find(".plot").text().trim();
      var release =movieEl.find(".date").text().trim();
      var rating =movieEl.find(".rating").text().trim();
      movie.save({title: title, plot:plot, release: release, rating:rating});
    }
  },
  deleteMovie: function (e) {
    var movieEl = $(e.target).parents(".movie");
    var movie = this.model;
    movie.destroy();
    movieEl.remove();
  },
  render: function () {
    var markup = this.template(this.model.toJSON());
    this.$el.html(markup);
    return this;
  },
  initialize: function () {}

});
