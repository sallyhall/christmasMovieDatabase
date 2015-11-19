var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var tmpl = require('./templates');
var MovieModel = require('./movie');

module.exports = Backbone.View.extend({
  className: "movieForm",
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
    $("input").val("");
    var newModel = new MovieModel(newMovie);
    var that=this;
    newModel.save().then(function () {
      that.collection.add(newModel);
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
        return -1*a.get('rating');
      };
    }
    this.collection.sort();
  },
  initialize: function () {},
  template: _.template(tmpl.form),
  render: function () {
    var markup = this.template({});
    this.$el.html(markup);
    return this;
  },

});
