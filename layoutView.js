var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var HeaderView = require('./headerView');
var FooterView = require('./footerView');
var FormView = require('./formView');
var MoviesView = require('./movieCollectionView');
var MovieCollection = require('./movieCollection');

module.exports = Backbone.View.extend({
  el: '#layoutView',
  initialize: function () {
    var self = this;
    var headerHTML = new HeaderView();
    var footerHTML = new FooterView();
    var movieCollection = new MovieCollection();
    movieCollection.fetch().then(function () {
      var movieView = new MoviesView({collection: movieCollection});
      var formHTML = new FormView({collection: movieCollection});
      self.$el.find('header').html(headerHTML.render().el);
      self.$el.find('footer').html(footerHTML.render().el);
      self.$el.find('aside').html(formHTML.render().el);
    });


  }

});
