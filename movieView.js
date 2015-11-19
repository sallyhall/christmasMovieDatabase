var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
Backbone.$ = $;
var tmpl = require('./templates');


module.exports = Backbone.View.extend({
  tagName: 'article',
  className: 'movie',
  template: _.template(tmpl.movie),
  events: {
    'click .glyphicon-pencil': 'editMovieInfo',
    'click .glyphicon-trash': 'deleteMovie',
    'keypress h3,p': 'updateMovie',
  },
  editMovieInfo: function (e) {
    e.preventDefault();
    var movieText = this.$el.find("p,h3");
    movieText.attr("contenteditable",true);
    movieText.toggleClass("editable");
},
  updateMovie: function (e) {
    if(e.charCode===13){
      var movieEl = this.$el;;
      var movieText = movieEl.find("p,h3");
      movieText.attr("contenteditable",false);
      movieText.toggleClass("editable");
      var movie = this.model;
      var title = movieEl.find("h3").text().trim();
      var plot =movieEl.find(".plot").text().trim();
      var release =movieEl.find(".date").text().trim();
      var rating =movieEl.find(".rating").text().trim();
      movie.save({title: title, plot:plot, release: release, rating:rating});
    }
  },
  deleteMovie: function (e) {
    var movieEl = this.$el;
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
