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
    var that=this;
    newModel.save().then(function () {
      that.collection.unshift(newModel);
      that.addOne(newModel);
    });
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
