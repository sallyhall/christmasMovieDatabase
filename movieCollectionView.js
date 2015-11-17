var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
Backbone.$ = $;
var MovieView = require('./movieView');
var MovieModel = require('./movie')

module.exports = Backbone.View.extend({
  el: '.movies',
  events: {
    'click #imageUploadSubmit': 'submitForm',
    'click .glyphicon-pencil': 'editMovieInfo',
    'click .glyphicon-trash': 'deleteMovie',
    'keypress .movie': 'updateMovie',
    'click .sort': 'sortMovies'
  },
  submitForm: function (e) {
    e.preventDefault();
    var newMovie = {
      title: $("#movieTitle").val(),
      image: $("#imageURL").val(),
      description: $("#movieDescription").val(),
      release: $("#movieYear").val(),
      rating: $("#movieRating").val(),
    };
    var newModel = new MovieModel(newMovie);
    newModel.save();
    this.collection.add(newModel);
    this.addOne(newModel);      
  },
  editMovieInfo: function (e) {
    e.preventDefault();
    $(e.target).parents(".movie").find("p").attr("contenteditable",true);
    $(e.target).parents(".movie").find("h3").attr("contenteditable",true);
    $(e.target).parents(".movie").find("p").toggleClass("editable");
    $(e.target).parents(".movie").find("h3").toggleClass("editable");
  },
  updateMovie: function (e) {
    if(e.charCode===13){
      $(e.target).parents(".movie").find("p").attr("contenteditable",false);
      $(e.target).parents(".movie").find("h3").attr("contenteditable",false);
      $(e.target).parents(".movie").find("p").toggleClass("editable");
      $(e.target).parents(".movie").find("h3").toggleClass("editable");
      var id = $(e.target).parents("article").find(".editMovie").attr("id");
      var movie = this.collection.get(id);
      var title = $(e.target).parents(".movie").find("h3").text().trim();
      var plot =$(e.target).parents(".movie").find(".plot").text().trim();
      var release =$(e.target).parents(".movie").find(".date").text().trim();
      var rating =$(e.target).parents(".movie").find(".rating").text().trim();
      movie.save({title: title, plot:plot, release: release, rating:rating});
    }
  },
  deleteMovie: function (e) {
    e.preventDefault();
    var id = $(e.target).parent().attr('id');
    var movie = this.collection.get(id);
    movie.destroy();
    $(e.target).parents(".movie").remove();
  },
  sortMovies: function(e){
    e.preventDefault();
    var $button = $(e.target);
    $button.addClass("btn-success");
    $button.removeClass("btn-danger");
    $button.siblings(".sort").removeClass("btn-success");
    $button.siblings(".sort").addClass("btn-danger");
    if($button.hasClass("release")){
      this.collection.comparator=function(a){
        return a.get('release');
      };
    }
    else{
      this.collection.comparator=function(a){
        return a.get('rating');
      };
    }
    this.collection.sort();
    this.$el.find(".movieList").html("");
    this.addAll();
  },
  initialize: function () {
    this.addAll();
  },
  addOne: function (movieModel) {
    var movieView = new MovieView({model: movieModel});
    this.$el.find(".movieList").prepend(movieView.render().el);
  },
  addAll: function () {
    _.each(this.collection.models, this.addOne, this);
  },
})
