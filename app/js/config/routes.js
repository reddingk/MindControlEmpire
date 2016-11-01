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
        url: "/details/:artistId",
        views: {
          'content@': {
            templateUrl: 'views/artists_details.html',
            controller: 'ArtistsController as ac'
          }
        }
      })
      .state('app.empire', {
        url: "empire",
        views: {
          'content@': {
            templateUrl: 'views/empire.html',
            controller: 'EmpireController as ec'
          }
        }
      })
      .state('app.empire.media', {
        url: "/media",
        views: {
          'content@': {
            templateUrl: 'views/media.html',
            controller: 'MediaController as mc'
          }
        }
      })
      .state('app.news', {
        url: "news",
        views: {
          'content@': {
            templateUrl: 'views/news.html',
            controller: 'NewsController as nc'
          }
        }
      })
      .state('app.news.article', {
        url: "/article/:newsid",
        views: {
          'content@': {
            templateUrl: 'views/news_article.html',
            controller: 'NewsController as nc'
          }
        }
      })
      .state('app.events', {
        url: "events",
        views: {
          'content@': {
            templateUrl: 'views/events.html',
            controller: 'EventsController as ec'
          }
        }
      })
      .state('app.releases', {
        url: "releases",
        views: {
          'content@': {
            templateUrl: 'views/releases.html',
            controller: 'ReleasesController as rc'
          }
        }
      })
      .state('app.contactus', {
        url: "contactus",
        views: {
          'content@': {
            templateUrl: 'views/contactus.html',
            controller: 'ContactUsController as cc'
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

      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
    }]);


})();
