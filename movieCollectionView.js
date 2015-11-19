var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
Backbone.$ = $;
var MovieView = require('./movieView');
var MovieModel = require('./movie')

module.exports = Backbone.View.extend({
  el: '.movies',
  initialize: function () {
    $(".movieList").html("");
    this.addAll();
  },
  addOne: function (movieModel,addedBy) {
    var movieView = new MovieView({model: movieModel});
    if(addedBy==="form"){
      this.$el.find(".movieList").prepend(movieView.render().el);
    }
    else{
      this.$el.find(".movieList").append(movieView.render().el);
    }
  },
  addAll: function () {
    _.each(this.collection.models, this.addOne, this);
  },
})
