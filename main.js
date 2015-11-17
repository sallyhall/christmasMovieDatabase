var $ = require('jquery');
var MovieCollection = require('./movieCollection');
var MovieCollectionView = require('./movieCollectionView');

$(function () {
  var movies = new MovieCollection();

  movies.fetch().then(function (data) {
    new MovieCollectionView({collection: movies});

  });
})
