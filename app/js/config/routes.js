(function(){

  angular
    .module('config')
    .config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
      .state('app', {
        url: "/",
        views: {
          'content':{
            templateUrl: 'views/home.html',
            controller: 'HomeController as hc'
          },
          'header':{
            templateUrl: 'views/templates/_header.html',
            controller: 'HeaderController as hdc'
          },
          'footer':{
            templateUrl: 'views/templates/_footer.html'
          }
        }
      })
      .state('app.artists', {
        url: "artists",
        views: {
          'content@': {
            templateUrl: 'views/artists.html',
            controller: 'ArtistsController as ac'
          }
        }
      })
      .state('app.artists.details', {
        url: "artists/:artistId",
        views: {
          'content@': {
            templateUrl: 'views/artists_details.html',
            controller: 'ArtistsController as ac'
          }
        }
      })
      .state('app.construction', {
        url: "underconstruction",
        views: {
          'content@': {
            templateUrl: 'views/underconstruction.html'
          }
        }
      });



      $urlRouterProvider.otherwise('/');
      //$locationProvider.html5Mode(true);
    }]);


})();
