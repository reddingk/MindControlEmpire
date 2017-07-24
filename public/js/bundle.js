(function () {
	"use strict";
		angular.module('dataconfig', []);
		angular.module('config', [ 'ngMaterial' ]);
		angular.module('headerCtrl', ['ui.bootstrap']);
		angular.module('homeCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('artistsCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('empireCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('mediaCtrl', ['ui.bootstrap', 'ngAnimate', 'infinite-scroll']);
		angular.module('newsCtrl', ['ui.bootstrap', 'ngAnimate', 'ngSanitize']);
		angular.module('eventsCtrl', ['ui.bootstrap', 'ngAnimate', 'ui.calendar']);
		angular.module('releasesCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('contactUsCtrl', ['ui.bootstrap', 'ngAnimate']);

		angular.module('directives', []);

		/**/
    angular.module('MCEApp', ['ngMaterial','ngAnimate', 'ngScrollbars','ui.router', 'infinite-scroll', 'dataconfig', 'config','directives','headerCtrl','homeCtrl','artistsCtrl','empireCtrl','mediaCtrl','newsCtrl','eventsCtrl','releasesCtrl','contactUsCtrl']);

})();

(function(){
  'use strict';

  angular
    .module('dataconfig')
    .service('mceInfo', [ 'MCEData', '$filter', '$http', function MCEInfo(MCEData, $filter, $http){
      var artists = MCEData.siteData.artists;
      var events = MCEData.siteData.events;
      var news = MCEData.siteData.news;
      var mcempire = MCEData.siteData.mcempire;
      var spotlights = MCEData.siteData.spotlights;
      var slider = MCEData.siteData.slider;
      var media = MCEData.siteData.media;

      function eventsByname(name, max) {
        var returnedEvents=[];

        for(var i =0; i < events.length; i++){
          if(events[i].artistname == name && returnedEvents.length <= max){
            returnedEvents.push(events[i]);
          }
        }
        return returnedEvents;
      }

      function stringFormat(str, args) {
         var content = str;
         for (var i=0; i < args.length; i++) {
              var replacement = '{' + i + '}';
              content = content.replace(replacement, args[i]);
         }
         return content;
      }

      return {
        artists: {
          all: function(){
            return artists;
          },
          top: function() {
            return artists.slice(0, 3);
          },
          byName: function(artistName) {
            var returnArtist = null;
            for(var i =0; i < artists.length; i++){
              if(artists[i].name == artistName){
                returnArtist = artists[i];
                // Add Events
                returnArtist.events = eventsByname(artistName, 5);
                break;
              }
            }
            returnArtist.releases = returnArtist.releases.sort(function(a,b){return b.date - a.date;});
            return returnArtist;
          }
        },
        events: {
          all: function(){
            var sortedEvents = events.sort(function(a,b){return b.date - a.date;});

            // Get artist image
            for(var i =0; i < sortedEvents.length; i++){
              for(var j =0; j < artists.length; j++){
                if(sortedEvents[i].artistname == artists[j].name ){
                  sortedEvents[i].artistimg = artists[j].image;
                }
              }
            }

            return sortedEvents;
          }
        },
        news: {
          all: function(){
            $filter('orderBy')(news, "-date");
            return news;
          },
          byName: function(articleName){
            var article = null;
            for(var i =0; i < news.length; i++){
              if(news[i].title == articleName){
                article = news[i];
                break;
              }
            }
            return article;
          },
          latests: function(){
            $filter('orderBy')(news, "-date");
            return news.slice(0, 4);
          }
        },
        mcempire: {
          all: function(){
            return mcempire;
          }
        },
        spotlights: {
          all: function(){
            return spotlights;
          }
        },
        releases: {
          all: function(){
            var returnReleases = [];

            for(var i =0; i < artists.length; i++) {
              var tmpList = artists[i].releases;
              for(var j=0; j < tmpList.length; j++){
                tmpList[j].artists = artists[i].name;
              }
              returnReleases = returnReleases.concat(tmpList);
            }
            $filter('orderBy')(returnReleases, "-date");
            return returnReleases;
          }
        },
        slider: {
          all: function(){
            for(var i=0; i < slider.length; i++){
              slider[i].id = i;
            }
            return slider;
          }
        },
        media: {
          all: function (){
            var mediaList=[];
            for(var i=0; i< media.length; i++){
              mediaList.push({"id":i, "img":media[i]});
            }
            return mediaList;
          },
          flickrAll: function(callback){
            var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={0}&photoset_id={1}&user_id={2}&format=json&nojsoncallback=1";
            var fullUrl = stringFormat(url, ["37ecabdfda65c6e2cf2847f4bc54ce44", "72157680164158474", "149188780@N02"]);

            $http({
              method: 'GET',
              url: fullUrl,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(response) {
                var responseList = response.data.photoset.photo;
                var photoUrl = "http://c1.staticflickr.com/{0}/{1}/{2}_{3}_b.jpg";
                var tmpObj = [];
                for(var j=0; j < responseList.length; j++){
                  tmpObj.push({"id":j, "title":responseList[j].title, "img":stringFormat(photoUrl, [responseList[j].farm, responseList[j].server, responseList[j].id, responseList[j].secret])});
                }
                callback(tmpObj);
            }, function errorCallback(response){

            });

          }
        }
      }
    }])
    .factory("MCEData", ['$q', '$http', function($q, $http){
     function MCEInfoData() {
       var vm = this;


       vm.siteData = {
          "artists":[
              {"name":"GANDHI ALI", "quote":"Real Live", "bio":"Mind Control Empire's first solo artist","image":"GandhiAli/GandhiAli.jpg",
                "addimages":["GandhiAli/GandhiAli.png", "GandhiAli/GandhiAli1.jpg","GandhiAli/GandhiAli2.jpg","GandhiAli/GandhiAli3.jpg","GandhiAli/GandhiAli4.jpg","GandhiAli/GandhiAli5.jpg","GandhiAli/GandhiAli6.jpg","GandhiAli/GandhiAli7.jpg"],
              "social":[
                  {"site":"twitter","handle":"gandhi3x"},
                  {"site":"instagram","handle":"gandhi3x"},
                  {"site":"soundcloud","handle":"gandhi3x"}],
              "releases":[
                  {"title":"Never Mind Em", "type":"youtube","date":new Date("2017-06-18"),"urlcode":"5WkiBOylzC0","text":"Gandhi Ali Never Mind Em"},

                  {"title":"Never Mind Em", "type":"itunes", "url":"https://itunes.apple.com/us/album/never-mind-em-single/id1227808499", "img":"imgs/art/neverMindEm.png"},
                  {"title":"Kill Em All", "type":"itunes", "url":"https://itunes.apple.com/album/id1167613517?ls=1&amp;app=itunes", "img":""},
                  {"title":"D.D.M.", "type":"itunes", "url":"https://itunes.apple.com/album/id1135657412?ls=1&amp;app=itunes", "img":"imgs/art/DDM.jpg"},
                  {"title":"Sorry", "type":"itunes", "url":"https://itunes.apple.com/album/id1137842803?ls=1&amp;app=itunes", "img":""},

                  {"title":"Five", "type":"youtube","date":new Date("2016-09-15"),"urlcode":"8YyLoJkPYRI","text":"Gandhi Ali Five"},
                  {"title":"Riding", "type":"youtube","date":new Date("2016-12-07"),"urlcode":"34YuaewcAzo","text":"Gandhi Ali Ridin' ft. King Kla$$"},
                  {"title":"Jumpman", "type":"youtube","date":new Date("2015-12-12"),"urlcode":"bjMnCi8KEFg","text":"Jumpman"},

                  {"title":"Yeah2x", "type":"spinrilla-track","date":new Date("2017-04-15"),"url":"https://spinrilla.com/singles/1139484-gandhi-ali-yeah2x","text":"Gandhi Ali - Yeah2x", "img":"https://cdn.spinrilla.com/tracks/1139484/large/1139484.png?1492712270"},
                  {"title":"Freestyle", "type":"youtube","date":new Date("2017-04-15"),"urlcode":"BlCM6L4Gbss","text":"Freestyle  shot by: @ShotByRayGun"},
                  {"title":"Lucky", "type":"youtube","date":new Date("2017-02-24"),"urlcode":"DJGjXKln8L8","text":"Lucky"},

                  {"title":"TD And Dab", "type":"spinrilla-track","date":new Date("2016-10-15"),"url":"https://spinrilla.com/singles/846503-gandhi-ali-td-and-dab","text":"Gandhi Ali - TD And Dab", "img":"https://cdn.spinrilla.com/tracks/846503/large/846503.jpg?1477514437"},
                  {"title":"Lil Bih", "type":"spinrilla-track","date":new Date("2016-10-15"),"url":"https://spinrilla.com/singles/834636-gandhi-ali-lil-bih","text":"Gandhi Ali - Lil Bih", "img":"https://cdn.spinrilla.com/tracks/834636/large/834636.png?1476733332"},
                  {"title":"Kill Em All", "type":"soundcloud-track","date":new Date("2016-10-09"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-kill-em-all-prod-by-trackanometry-drty-warhol-rough","text":"Gandhi Ali - Kill Em All", "img":"https://i1.sndcdn.com/artworks-000187342796-09tszq-t200x200.jpg"},
                  {"title":"100% ft. Yung Sonic", "type":"soundcloud-track","date":new Date("2016-08-20"),"url":"https://soundcloud.com/gandhi3x/100-ft-yung-sonic","text":"Gandhi Ali ft. Yung Sonic - 100%" , "img":"https://i1.sndcdn.com/artworks-000175223671-v5zlyr-t200x200.jpg"},
                  {"title":"Sorry", "type":"soundcloud-track","date":new Date("2016-08-20"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-sorry","text":"Gandhi Ali - Sorry", "img":"https://i1.sndcdn.com/artworks-000173467761-h8v0ax-t200x200.jpg"},
                  {"title":"Dirty Work", "type":"spinrilla-mixtape", "date":new Date("2016-07-12"), "url":"https://spinrilla.com/mixtapes/gandhi-ali-dirty-work/embed","text":"Drty Work by Gandhi Ali"},
                  {"title":"SoundCloudProfile", "type":"soundcloud-profile","date":"","url":"https://soundcloud.com/gandhi3x","text":"Gandhi Ali Sound Cloud Profile"},
                  {"title":"Girlfriend Remix", "type":"soundcloud-track","date":new Date("2016-06-20"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-girlfriend-remix","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000166403193-lgnbsc-t200x200.jpg"},
                  {"title":"Savages", "type":"soundcloud-track","date":new Date("2016-05-10"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-savages","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000162387810-4so50q-t200x200.jpg"},
                  {"title":"Publicly Intoxicated ft. JA", "type":"soundcloud-track","date":new Date("2016-04-24"),"url":"https://soundcloud.com/gandhi3x/publiclyintoxicated","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000157641977-43mb86-t200x200.jpg"},
                  {"title":"Legal", "type":"soundcloud-track","date":new Date("2016-02-13"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-legal","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000148553495-n6d8ig-t200x200.jpg"},
                  {"title":"Deal (Prod By Drty Warhol x Carlos Montiel)", "type":"soundcloud-track","date":new Date("2016-2-20"),"url":"https://soundcloud.com/gandhi3x/gandhi-ali-deal-freestyle","text":"Gandhi Ali - Girlfriend Remix", "img":"https://i1.sndcdn.com/artworks-000147494836-o2mx79-t200x200.jpg"},

                  {"title":"Dapper", "type":"youtube","date":new Date("2016-08-13"),"url":"https://www.youtube.com/embed/cy4Jhd16VJE", "urlcode":"cy4Jhd16VJE","text":"'Dapper' video shot by TOA$T"},
                  {"title":"100%", "type":"youtube","date":new Date("2016-06-17"),"url":"https://www.youtube.com/embed/vKIc3P1o798", "urlcode":"vKIc3P1o798","text":"'100%' video produced by DWJproductions"},
                  {"title":"Tell The People", "type":"youtube","date":new Date("2016-06-09"),"url":"https://www.youtube.com/embed/H0G2iBe0axQ", "urlcode":"H0G2iBe0axQ","text":"'Tell The People' video produced by DWJproductions"},

                  {"title":"New Ballin feat. J.A.", "type":"youtube","date":new Date("2016-10-12"),"url":"https://www.youtube.com/embed/EY_1yEP8PJ8", "urlcode":"EY_1yEP8PJ8" ,"text":"New Ballin feat. J.A.", "art":"art/new_ballin.PNG"},
                  {"title":"Real Live", "type":"youtube","date":new Date("2015-08-20"),"url":"https://www.youtube.com/embed/UwYWQNkdF1Y",  "urlcode":"UwYWQNkdF1Y" ,"text":"The first track on Mind Control Empire"},
                  {"title":"Poetic Justice Freestyle", "type":"youtube","date":new Date("2015-02-13"),"url":"https://www.youtube.com/embed/-JYqJd3irRw",  "urlcode":"-JYqJd3irRw" ,"text":"A freestyle to the classic poetic justice track"},
                  {"title":"Call Em In", "type":"youtube","date":new Date("2016-02-04"),"url":"https://www.youtube.com/embed/OUaHK84TkBY",  "urlcode":"OUaHK84TkBY" ,"text":"'Call Em In' video produced by DWJproductions", "art":"art/Call_em_in.PNG"},
                  {"title":"Loyal", "type":"youtube","date":new Date("2016-02-25"),"url":"https://www.youtube.com/embed/j5kak2e0S-8",  "urlcode":"j5kak2e0S-8" ,"text":"'Loyal' video produced by DWJproductions"},
                  {"title":"Whole Time", "type":"youtube","date":new Date("2016-02-11"),"url":"https://www.youtube.com/embed/aM2K9vl5Z2Y",  "urlcode":"aM2K9vl5Z2Y" ,"text":"'Whole Time' video produced by DWJproductions"},
                  {"title":"Radio Remix Vol 1: Jackin Beats", "type":"spinrilla-mixtape", "date":new Date("2016-04-13"), "url":"https://spinrilla.com/mixtapes/gandhi-ali_dmv-radio-remix-vol-1-jackin-beats-by-gandhi-ali/embed","text":"Radio Remix Vol 1. by Gandhi Ali","content":"<iframe width='100%' height='450px' style='border: 0' src='https://spinrilla.com/mixtapes/gandhi-ali_dmv-radio-remix-vol-1-jackin-beats-by-gandhi-ali/embed' allowtransparency='true'></iframe>"}
              ]}
          ],
          "events":[
              { "eventname":"Basement Tuesdays", "location":"Pure Lounge - 1326 U Street, NW, DC", "date":new Date( "2017-07-25 19:00:00"), "artistname":"GANDHI ALI", "tags":[]},
              { "eventname":"Midnight Flow 2", "location":"8241 Georgia Ave., Silver Spring, Md. 20910", "date":new Date( "2016-11-02 21:00:00"), "artistname":"GANDHI ALI", "tags":[]},
              { "eventname":"SXSW Performance", "location":"South by Southwest Festival: Austin, Tx", "date":new Date( "2016-03-17 10:00:00"), "artistname":"GANDHI ALI", "tags":[]},
              { "eventname":"Hiphopyogalive performance", "location":"Washington Dc-Amsterdam Lounge", "date":new Date("2015-12-02 22:00:00"), "artistname":"GANDHI ALI",  "tags":[]},
              { "eventname":"Performance", "location":"Washington Dc:Zeba Bar", "date":new Date("2015-09-18 21:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Video Shoot", "location":"Hyattsville, Md: Hoodroach Tv", "date":new Date("2015-08-01 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Performance", "location":"Silver Spring, MD FestAfrica", "date":new Date("2015-08-08 00:00:00"), "artistname":"GANDHI ALI", "time":"00:00:00", "tags":[]},
              { "eventname":"Video Shoot", "location":"Hyattsville, Md: DWJ Productions", "date":new Date("2015-08-15 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Radio Interview", "location":"Temple Hills, MD: WinDC Radio", "date":new Date("2015-09-21 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Photo Shoot", "location":"National Harbor", "date":new Date("2015-08-21  00:00:00"), "artistname":"MIND CONTROL EMPIRE", "tags":[]},
              { "eventname":"Performance", "location":"Washington, DC: Pure Lounge", "date":new Date("2015-09-29 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Photo/Video Shoot", "location":"Germantown, MD: DWJ Productions", "date":new Date("2015-10-08 00:00:00"), "artistname":"MIND CONTROL EMPIRE",  "tags":[]},
              { "eventname":"Video Shoot", "location":"Washington, DC: ClipstarTV", "date":new Date("2015-11-05 00:00:00"), "artistname":"MIND CONTROL EMPIRE", "tags":[]},
              { "eventname":"Radio Interview", "location":"Washington, DC: Eddie Kayne Show", "date":new Date("2015-11-21 00:00:00"), "artistname":"MIND CONTROL EMPIRE", "tags":[]}
              ],
          "mcempire":[
              {"name":"'G'", "position":"CEO", "img":"site-images/GField.jpg","icon":"fa-building", "bio":"", "social":[{"site":"twitter", "handle":"Sir_CEO"}, {"site":"instagram", "handle":"CEO_KING_FIELDMOB"}]},
              {"name":"Dwayne", "position":"Videographer & Photographer", "img":"site-images/Dwayne.jpg","icon":"fa-video-camera", "bio":"", "social":[{"site":"twitter", "handle":"DWJproduction"}, {"site":"instagram", "handle":"DWJproduction"}]},
              {"name":"Drty Warhol", "position":"Producer", "img":"site-images/Fields.jpg", "icon":"fa-headphones", "bio":"", "social":[{"site":"twitter", "handle":"inspiredmindz"},{"site":"soundcloud", "handle":"inspiredmindz"}]}
              ],
          "news":[
              {"title":"Gandhi Ali Live @ Basement Tuesday's", "date":new Date("2017-07-23 00:00:00"), "img":"imgs/media/basementEvent.jpg", "content":"Gandhi Ali will be performing Live at Pure Lounge's Basement Tuesday's.  21 and up, Doors open at 7pm @ 1326 U Street, NW, DC", "tags":["GANDHI ALI","Basement Tuesday"]},
              {"title":"'Never Mind Em' Out Now", "date":new Date("2017-04-18 00:00:00"), "img":"imgs/site-images/nevermindem.jpg", "content":"Never Mind Em Single Out now on ITunes, Spotify, and more....", "link":{"url":"https://itunes.apple.com/us/album/never-mind-em-single/id1227808499", "text":"Itunes Download"}, "tags":["GANDHI ALI","Spotify", "Itunes"]},
              {"title":"SXSW Performance", "date":new Date("2016-03-18 00:00:00"), "img":"imgs/site-images/Gandhi-sxsw.png", "content":"GANDHI Ali will be performing at this years SXSW (South By Southwest) music festival in Austin, TX. Visit http://www.sxsw.com/music for event and ticket information.", "tags":["GANDHI ALI","SXSW"]},
              {"title":"GANDHI Ali is releasing Drty Warhol Vol. 1", "date":new Date("2016-02-25 00:00:00"), "img":"imgs/art/DrtyWorkCover.jpg", "content":"GANDHI Ali is releasing Drty Work Vol. 1 produced by Drty Warhol in late February.  The Mixtape will be released here, Live Mixtapes, Spinrilla, & Soundcloud", "tags":["GANDHI ALI","Drty Work Vol. 1"]},
              {"title":"Website Launch", "date":new Date("2015-12-03 00:00:00"), "content":"The New Mind Control Empire website has officially been launched.  Welcome to the new Mind Control Empire Website", "tags":["Website","Mind Control Empire"]},
              {"title":"Drty Warhol Vol.1 coming soon", "date":new Date("2015-12-02 00:00:00"), "content":"Drty Warhol Vol.1 Mixtape coming in January will be released on the site.", "tags":["Mixtape","Mind Control Empire"], "image":"art/DrtyWorkCover.jpg"},
              {"title":"'The City' on the way", "date":new Date("2015-12-02 00:00:00"), "content":"The Video for 'The City' will be released this December.", "tags":["Video","Mind Control Empire"]}
              ],
          "spotlights":[
              {"order":1, "artist":"GANDHI ALI","title":"Never Mind Em", "type":"youtube","date":"2016-06-18","urlcode":"5WkiBOylzC0","text":"Gandhi Ali Never Mind Em"},
              {"order":2, "artist":"GANDHI ALI","title":"Gandhi Ali - Freestyle", "type":"youtube","date":"2017-04-15","urlcode":"BlCM6L4Gbss","text":"Listen to Gandhi Ali's Freestyle  shot by: @ShotByRayGun"},
              {"order":3, "artist":"GANDHI ALI","title":"Gandhi Ali - Lucky", "type":"youtube","date":"2017-02-24","urlcode":"DJGjXKln8L8","text":"Listen to Gandhi Ali's Lucky"},
              {"order":4, "artist":"GANDHI ALI","title":"Chocolate City (Teaser)", "type":"youtube","date":"2016-08-25","urlcode":"LUHaEGtSHmc","text":"Walk with Gandhi Ali as he takes his new song through DC aka 'Chocolate City'"}
            ],
          "slider": [
            {"image":"imgs/media/basementEvent.jpg", "title":"Basement Tuesdays Performance", "text":"Gandhi Ali will be performing this tuesday at Pure Lounge's 'Basement Tuesdays'" , "link":{"url":"https://www.mindcontrolempire.com/news/article/Gandhi%20Ali%20Live%20@%20Basement%20Tuesday's", "text":"More Info"}},
            {"image":"imgs/site-images/NevermindemVid.JPG", "title":"New Video 'Never Mind Em'", "text":"Video for Gandhi's Single 'Never Mind Em' now avaliable on Youtube", "link":{"url":"https://www.youtube.com/watch?v=5WkiBOylzC0", "text":"Watch Now"}},

            {"image":"imgs/slider/main1.png", "title":"Mind Control Empire", "text":""},
            {"image":"imgs/art/neverMindEm.png", "title":"Never Mind Em Now Avaliable", "text":"Gandhi's Single 'Never Mind Em' now avaliable on ITunes", "link":{"url":"https://itunes.apple.com/us/album/never-mind-em-single/id1227808499", "text":"Download Now"}},
            {"image":"imgs/site-images/doubleDrop2.jpg", "title":"Gandhi Video's Drop", "text":"Check out Gandhi's two new video release's 'Freestyle' & 'Lucky' "}        
          ],
          "media":["imgs/media/IMG1.jpg","imgs/media/IMG2.jpg","imgs/media/IMG4.jpg","imgs/media/IMG5.jpg","imgs/media/IMG6.jpg","imgs/media/IMG7.jpg","imgs/media/IMG8.jpg","imgs/media/IMG9.jpg","imgs/media/IMG10.png","imgs/media/IMG11.jpg","imgs/media/IMG12.jpg","imgs/media/IMG13.jpg","imgs/media/IMG14.jpg","imgs/media/IMG15.jpg"]
      };
     }

     return new MCEInfoData();
    }]);

})();

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

(function(){
   "use strict";

    angular.module('directives').directive('backImg', ['$window', function($window) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {
          var url = attrs.backImg;
          element.css({'background-image': 'url(' + url +')'});
        }
      }

    }]);

})();

(function(){
   "use strict";

    angular.module('directives').directive('photoMotion', ['$window', function() {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {

          var itemid = $scope.$eval(attrs.itemid);
          var itemcount = $scope.$eval(attrs.itemcount);
          var isNav = $scope.$eval(attrs.isnav);

          //-item position function
          function getItemLocation(locid, elemId){
            //-selected id
            var selectedid = (elemId == null ? $scope.$eval(attrs.selectedid) : elemId);

            // Get element by id
            var stackCont = angular.element(document).find('.stack-container');
            var elemMove = stackCont.children()[locid];
            var imgElem = elemMove.children[0].children[0];

            var pageWidth = window.innerWidth;
            var offsetX = ((imgElem.naturalWidth * ( pageWidth < 801 ? 170 : 320)) / imgElem.naturalHeight);
            var defaultX = Math.floor((stackCont[0].offsetWidth - offsetX)/2);
            var maxX = Math.floor(pageWidth * .86);

            var x = (selectedid == locid ? (defaultX < 0 ? 0 : defaultX) : Math.floor(Math.random() * maxX) - 200);
            var y = (selectedid == locid ? 50 : Math.floor(Math.random() * 401) - 100);
            var angle = (selectedid == locid ? 0 : Math.floor(Math.random() * 80) - 40) ;

            // Check Out of Bounds
            x = (x < -50 ? -40 : x);
            y = (y < 30 ? 30 : y);

            elemMove.style.transform = "translate("+x+"px, "+ y+"px)"+ "rotate("+angle + "deg)";
          }

          // On click Set selected id
          element.bind('click', function() {
            if(itemid != $scope.$eval(attrs.selectedid)){
              for(var i=0; i < itemcount; i++)
              {
                getItemLocation(i, itemid);
              }
            }
          });
          // Intitial Object Set
          getItemLocation(itemid, null);
        }
      }
    }]);

})();

(function(){
   "use strict";

    angular.module('directives').directive('randomMotion', ['$timeout', function($timeout) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {
          console.log("Start Motion");
          var parentContainer = element[0].offsetParent;

          // Randomly Set Postion & Velocity
          var maxVelocity = 150;
          var posX = (Math.random() * parentContainer.clientWidth);//Math.min(0, Math.max(20, (Math.random() * 0)));
          var posY = (Math.random() * parentContainer.clientHeight);//Math.min(0, Math.max(20, (Math.random() * 10)));
          var velX = (Math.random() * maxVelocity);
          var velY = (Math.random() * maxVelocity);
          var timestamp = null;



          // Move Object
          (function tick() {
            var now = new Date().getTime();
            var borderX = 250; //parentContainer.clientWidth *.05;
            var borderY = 250; //parentContainer.clientHeight *.20;

            var maxX = parentContainer.clientWidth - borderX;
            var maxY = parentContainer.clientHeight - borderY;

            var elapsed = (timestamp || now) - now;
            timestamp = now;
            posX += elapsed * velX / 1000;
            posY += elapsed * velY / 1000;

            if (posX > maxX) {
                posX = 2 * maxX - posX;
                velX *= -1;
            }
            if (posX < -60) {
                posX = -60;
                velX *= -1;
            }
            if (posY > maxY) {
                posY = 2 * maxY - posY;
                velY *= -1;
            }
            if (posY < -60) {
                posY = -60;
                velY *= -1;
            }
            element.css({ "top": posY, "left": posX });
            // Set Position to $element top and left
            // Loop to Move object
            $timeout(tick, 30);
          })();
        }
      }
    }]);

})();

(function(){
   "use strict";

    angular.module('directives').directive('scrollAction', ['$window', function($window) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {

          var selectOffset = (attrs.scrollAction == null ? 0 : attrs.scrollAction);
          var windowp = angular.element($window)[0];
          var offsetTop = element[0].offsetTop;
          var topThreshHold = element.position().top; //offsetTop - selectOffset;
          element.addClass("screenScroll");

          if(windowp.pageYOffset >= topThreshHold){
            if(!element.hasClass("screenAction")){
              element.addClass("screenAction");
            }
          }
          else {
            element.addClass("screenEmpty");
          }

          angular.element($window).bind("scroll", function() {
            selectOffset = (attrs.scrollAction == null ? 0 : attrs.scrollAction);
            windowp = angular.element($window)[0];
            offsetTop = element[0].offsetTop;
            //(element[0].offsetParent != null && element[0].offsetTop < element[0].offsetParent.offsetTop ? element[0].offsetParent.offsetTop : element[0].offsetTop);
            topThreshHold = offsetTop - selectOffset;

            if(windowp.pageYOffset >= topThreshHold){
              if(!element.hasClass("screenAction")){
                element.removeClass("screenEmpty");
                element.addClass("screenAction");
              }
            }

          });
        }
      }

    }]);

})();

(function(){
   "use strict";

    angular.module('directives').directive('sectionSelect', ['$window', function($window) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {

          angular.element($window).bind("scroll", function() {

            var selectOffset = 200;

            var windowp = angular.element($window)[0];
            var topThreshHold = element[0].offsetTop - selectOffset;
            var bottomThreshHold = (element[0].offsetTop + element[0].offsetHeight) - selectOffset;

            if(windowp.pageYOffset >= topThreshHold && windowp.pageYOffset < bottomThreshHold){
              if(!element.hasClass("screenSelect")){
                element.addClass("screenSelect");
              }
            }
            else {
              if(element.hasClass("screenSelect")){
                element.removeClass("screenSelect");
              }
            }

          });
        }
      }

    }]);

})();

(function(){
 "use strict";

  angular.module('artistsCtrl').controller('ArtistsController', ['$state','$stateParams','mceInfo','$sce', function($state, $stateParams, mceInfo, $sce){
    var vm = this;
    vm.title = "artists";

    vm.allArtists = mceInfo.artists.all();

    /*Artist Details*/
    vm.artistId = $stateParams.artistId;
    vm.artistProfile = null;
    vm.displayedReleases = null;
    vm.displayedImg = null;
    var itemDisplayMax = 3;

    if(vm.artistId != undefined)
    {
      vm.artistProfile = mceInfo.artists.byName(vm.artistId);
      vm.displayedImg = vm.artistProfile.image;
      vm.allReleases = {"videos":[], "mixtapes":[], "profiles":[], "itunes":[]};

      for(var i =0; i < vm.artistProfile.releases.length; i++)
      {
        var tmpRelease = vm.artistProfile.releases[i];
        if(tmpRelease.type == "youtube"){
          vm.allReleases.videos.push(tmpRelease);
        }
        else if(tmpRelease.type.includes("mixtape")){
          vm.allReleases.mixtapes.push(tmpRelease);
        }
        else if(tmpRelease.type.includes("profile")){
          vm.allReleases.profiles.push(tmpRelease);
        }
        else if(tmpRelease.type.includes("itunes")){
          vm.allReleases.itunes.push(tmpRelease);
        }
      }

      vm.displayedReleases = {
        "imgs":{"page":1, "totalpages":Math.ceil(vm.artistProfile.addimages.length / 4), "display": vm.artistProfile.addimages.slice(0,4)},
        "videos":{"page":1, "totalpages":Math.ceil(vm.allReleases.videos.length / itemDisplayMax), "releases":vm.allReleases.videos.slice(0,3)},
        "mixtapes":{"page":1, "totalpages":vm.allReleases.mixtapes.length , "releases":vm.allReleases.mixtapes[0]},
        "itunes":{"page":1, "totalpages":Math.ceil(vm.allReleases.itunes.length / itemDisplayMax), "releases":vm.allReleases.itunes.slice(0,3)},
        "profiles":vm.allReleases.profiles,
        "defaultImg": "imgs/logos/logoR.png"
      };
    }

    /*Functions*/
    vm.imgChange = imgChange;
    vm.imagePaging = imagePaging;
    vm.checkImgButton = checkImgButton;

    vm.replaceSpace = replaceSpace;
    vm.URLClean = URLClean;
    vm.releasePaging = releasePaging;
    vm.checkButton = checkButton;
    vm.isPassed = isPassed;
    vm.goToSocial = goToSocial;
    vm.buildArray = buildArray;
    vm.youtubeURL = youtubeURL;

    function youtubeURL(urlcode, type){
      var returnUrl = "";
      switch (type) {
        case "site":
          returnUrl = "https://www.youtube.com/watch?v="+urlcode;
          break;
        case "video":
          returnUrl = "https://www.youtube.com/embed/"+urlcode;
          break;
        case "image":
          returnUrl = "http://img.youtube.com/vi/"+urlcode+"/hqdefault.jpg";
          break;
        default:
          returnUrl = "";
          break;
      }
      return $sce.trustAsResourceUrl(returnUrl);
    }

    function buildArray(num) {
      return new Array(num);
    }

    function goToSocial(social){
      var newUrl = "";
      switch(social.site){
        case "twitter":
          newUrl = "https://twitter.com/" + social.handle;
          break;
        case "instagram":
          newUrl = "https://www.instagram.com/"+social.handle;
          break;
        case "soundcloud":
          newUrl = "https://soundcloud.com/"+social.handle;
          break;
      }
      return newUrl;
    }

    function isPassed(date){
      var today = new Date();
      return (date < today ? "passed" : "");
    }
    function checkButton(direction, type) {
      var bool = false;

      if(direction == "up"){
        if((vm.displayedReleases[type].page + 1) <= vm.displayedReleases[type].totalpages) {bool = true;}
      }
      else{
        if((vm.displayedReleases[type].page - 1) > 0) { bool = true;}
      }
      return bool;
    }

    function releasePaging(direction, type){
      if(direction == "up"){
        if((vm.displayedReleases[type].page + 1) <= vm.displayedReleases[type].totalpages)
        {
          vm.displayedReleases[type].page +=1;
        }
      }
      else{
        if((vm.displayedReleases[type].page - 1) > 0)
        {
          vm.displayedReleases[type].page -=1;
        }
      }
      var first = itemDisplayMax * (vm.displayedReleases[type].page  - 1);
      vm.displayedReleases[type].releases = (type != "mixtapes" ? vm.allReleases[type].slice(first,first+ itemDisplayMax) : vm.allReleases[type][(vm.displayedReleases[type].page  - 1)]);
    }

    function URLClean(url) {
      return $sce.trustAsResourceUrl(url);
    }

    function replaceSpace(string){
      return string.split(' ').join('_');
    }

    function checkImgButton(direction){
      var bool = false;

      if(direction == "up"){
        if((vm.displayedReleases.imgs.page + 1) <= vm.displayedReleases.imgs.totalpages) {bool = true;}
      }
      else{
        if((vm.displayedReleases.imgs.page - 1) > 0) { bool = true;}
      }
      return bool;
    }

    function imagePaging(direction) {
      if(direction == "up"){
        if((vm.displayedReleases.imgs.page + 1) <= vm.displayedReleases.imgs.totalpages)
        {
          vm.displayedReleases.imgs.page +=1;
        }
      }
      else{
        if((vm.displayedReleases.imgs.page - 1) > 0)
        {
          vm.displayedReleases.imgs.page -=1;
        }
      }
      var first = 4 * (vm.displayedReleases.imgs.page  - 1);
      vm.displayedReleases.imgs.display = vm.artistProfile.addimages.slice(first,first+ 4);
    }
    function imgChange(img) {
      vm.displayedImg = img;
    }



  }]);

})();

(function(){
 "use strict";

  angular.module('contactUsCtrl').controller('ContactUsController', ['$state', function($state){
    var vm = this;
    vm.buildArray = buildArray;
    vm.setX = setX;

    function buildArray(num) {
      return new Array(num);
    }

    function setX(index) {
      var xval = Math.ceil((index/5) * 100);

      var max = 100;
      var min = 0;
      var rxval = Math.random() * (max - min) + min;
      var returnX = rxval + "%";

      return returnX;
    }
  }]);

})();

(function(){
 "use strict";

  angular.module('empireCtrl').controller('EmpireController', ['$state','mceInfo', function($state,mceInfo){
    var vm = this;
    vm.mcEmpire = mceInfo.mcempire.all();

    /*Function*/
    vm.goToSocial = goToSocial;

    function goToSocial(social){
      var newUrl = "";
      switch(social.site){
        case "twitter":
          newUrl = "https://twitter.com/" + social.handle;
          break;
        case "instagram":
          newUrl = "https://www.instagram.com/"+social.handle;
          break;
        case "soundcloud":
          newUrl = "https://soundcloud.com/"+social.handle;
          break;
      }
      return newUrl;
    }
    
  }]);
})();

(function(){
 "use strict";

  angular.module('eventsCtrl').controller('EventsController', ['$state', 'mceInfo', function($state, mceInfo){
    var vm = this;
    vm.allEvents = mceInfo.events.all();

    /*Functions*/
    vm.isPassed = isPassed;    

    function isPassed(date){
      var today = new Date();
      return (date < today ? "passed" : "");
    }

    /*Configurations*/
      vm.uiConfig = {
        "calendar":{
          "editable": false,
          "header":{
            "left": "title", "center": '', "right": 'today prev, next'
          },
          eventClick: vm.alertOnEventClick
        }
      };

      vm.eventSource = { url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic", className: 'gcal-event', currentTimezone: 'America/Washington DC'  };
      vm.eventsF = function (start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{title: 'Default ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        callback(events);
      };

      function buildCalender(){
        var cEvents=[];
        for(var i=0; i < vm.allEvents.length; i++){
          //vm.calenderEvents
          cEvents.push({title: vm.allEvents[i].eventname, start:vm.allEvents[i].date, allDay: false});
        }
        return cEvents;
      }

      vm.calenderEvents = buildCalender();
      vm.eventSources = [vm.calenderEvents, vm.eventSource, vm.eventsF];
  }]);

})();

(function(){
 "use strict";

  angular.module('headerCtrl').controller('HeaderController', ['$state', function($state){
    var vm = this;
    vm.checkActivePage = checkActivePage;

    function checkActivePage(current) {
         var currentPage = $state;
         if (currentPage != null && currentPage.current.name.indexOf(current) > -1) { return true; }
         else { return false; }
    }

    var navMain = $("#mceNavbar");
     navMain.on("click", ".link", null, function () {
         navMain.collapse('hide');
     });

  }]);

})();

(function(){
   "use strict";

    angular.module('homeCtrl').controller('HomeController', ['$state','mceInfo','$sce', function($state, mceInfo, $sce){
      var vm = this;
      vm.title = "Home";

      vm.recentNews = mceInfo.news.latests();
      vm.newsBackSVG = "views/templates/_gravity.html";
      vm.topArtists = mceInfo.artists.top();
      vm.slider = mceInfo.slider.all();
      vm.spotlights = mceInfo.spotlights.all();
      vm.spotSelected = vm.spotlights[0];

      vm.active = 0;
      vm.interval = 0;
      vm.configScroll = {
          theme: 'dark-3',
          setHeight: false,
          scrollButtons: { enable: true },
          scrollInertia: 0
      };

      /*Functions */
      vm.youtubeURL = youtubeURL;
      vm.swapSelected = swapSelected;

      function youtubeURL(urlcode, type){
        return $sce.trustAsResourceUrl((type == "video"? "https://www.youtube.com/embed/"+urlcode : "http://img.youtube.com/vi/"+urlcode+"/default.jpg"));
      }
      function swapSelected(item) {
        vm.spotSelected = item;
      }

    }]);

})();

(function(){
   "use strict";

    angular.module('mediaCtrl').controller('MediaController', ['$state','mceInfo','$sce', '$mdDialog', function($state, mceInfo, $sce, $mdDialog){
      var vm = this;
      vm.title = "Media";
      var selectedImg = "";
      var itemDisplayMax = 8;
      var page = 0;
      //vm.media = mceInfo.media.all();
      vm.loading = true;
      mceInfo.media.flickrAll(function(res){
        vm.media = res;
        vm.displayItems = vm.media.slice(0,itemDisplayMax);
        page = 1;
        vm.selectedid = vm.displayItems[0].id;
        vm.loading = false;
      });

      /*Functions */
      vm.isSelected = isSelected;
      vm.changeSelected = changeSelected;
      vm.navSelected = navSelected;
      vm.enlargeImage = enlargeImage;
      vm.loadMore = loadMore;

      function loadMore(){
        page +=1;
        var first = itemDisplayMax * (page  - 1);
        if(vm.loading == false && vm.media.length > vm.displayItems.length ){
          vm.loading = true;
          var addItems = vm.media.slice(first, first + itemDisplayMax);
          vm.displayItems = vm.displayItems.concat(addItems);
          vm.loading = false;
        }
      }
      function enlargeImage(ev, item) {
        // Open Dialog
        selectedImg = item.img;
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/templates/_galleryPop.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: true
        });
      }

      function isSelected(id) {
        return (id == vm.selectedid ? "selected" : "");
      }
      function changeSelected(item) {
        vm.selectedid = item.id;
      }
      function navSelected(item) {
        return (item.images == vm.displayItems ? "selected" : "");
      }

      /**/

      function DialogController($scope, $mdDialog) {
        $scope.img = selectedImg;
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }

    }]);

})();

(function(){
 "use strict";

  angular.module('newsCtrl').controller('NewsController', ['$state','$stateParams','mceInfo', '$sce', function($state, $stateParams, mceInfo, $sce){
    var vm = this;

    vm.allNews = mceInfo.news.all();
    vm.displayedNews = {"page":1, "totalpages":Math.ceil(vm.allNews.length / 4), "display": vm.allNews.slice(0,4)};

    /*News Article*/
    var articleID = $stateParams.newsid;
    if(articleID != null){
        vm.articleNews = mceInfo.news.byName(articleID);
        vm.articleContent = "";
        vm.articleContent = specialTextChecks(vm.articleNews.content);
    }

    /*Functions*/
    vm.checkButton = checkButton;
    vm.newsPaging = newsPaging;
    vm.buildArray = buildArray;

    function checkButton(direction){
      var bool = false;
      if(direction == "up"){
        if((vm.displayedNews.page + 1) <= vm.displayedNews.totalpages) {bool = true;}
      }
      else{
        if((vm.displayedNews.page - 1) > 0) { bool = true;}
      }
      return bool;
    }

    function newsPaging(direction) {
      if(direction == "up"){
        if((vm.displayedNews.page + 1) <= vm.displayedNews.totalpages)
        {
          vm.displayedNews.page +=1;
        }
      }
      else{
        if((vm.displayedNews.page - 1) > 0)
        {
          vm.displayedNews.page -=1;
        }
      }
      var first = 4 * (vm.displayedNews.page  - 1);
      vm.displayedNews.display = vm.allNews.slice(first,first+ 4);
    }

    function buildArray(num) {
      return new Array(num);
    }

    function specialTextChecks(phrase){
      var returnPhrase = phrase;
      if(phrase.includes(".com")){
        var tmpPhrase = "";
        var phraseArray = phrase.split(" ");

        for(var i=0; i < phraseArray.length; i++){
          if(phraseArray[i].includes(".com")){
            var linkText = phraseArray[i].split(0,phraseArray[i].indexOf(".com")+4);
            phraseArray[i] = phraseArray[i].replace(linkText, '<a href="'+linkText+'" target="_blank">'+linkText+'</a>');
          }
        }

        returnPhrase = phraseArray.join(" ");
      }
      return returnPhrase;
    }

  }]);

})();

(function(){
 "use strict";

  angular.module('releasesCtrl').controller('ReleasesController', ['$state', 'mceInfo', '$sce',function($state,mceInfo,$sce){
    var vm = this;
    vm.releasesList = mceInfo.releases.all();
    vm.allReleases = {"videos":[], "mixtapes":[], "tracks":[]};
    vm.backSVG = "views/templates/_gravity.html";

    var itemDisplayMax = 6;    

    for(var i =0; i < vm.releasesList.length; i++)
    {
      var tmpRelease = vm.releasesList[i];
      if(tmpRelease.type == "youtube"){
        vm.allReleases.videos.push(tmpRelease);
      }
      else if(tmpRelease.type.includes("mixtape")){
        vm.allReleases.mixtapes.push(tmpRelease);
      }
      else if(tmpRelease.type.includes("track")){
        vm.allReleases.tracks.push(tmpRelease);
      }
    }

    vm.displayedReleases = {
      "videos":{"page":1, "totalpages":Math.ceil(vm.allReleases.videos.length / itemDisplayMax), "releases":vm.allReleases.videos.slice(0,itemDisplayMax)},
      "mixtapes":{"page":1, "totalpages":vm.allReleases.mixtapes.length , "releases":vm.allReleases.mixtapes[0]},
      "tracks":{"page":1, "totalpages":Math.ceil(vm.allReleases.tracks.length / itemDisplayMax), "releases":vm.allReleases.tracks.slice(0,itemDisplayMax)},
    };

    /*Functions*/
    vm.releasePaging = releasePaging;
    vm.checkButton = checkButton;
    vm.URLClean = URLClean;
    vm.youtubeURL = youtubeURL;

    function youtubeURL(urlcode, type){
      var returnUrl = "";
      switch (type) {
        case "site":
          returnUrl = "https://www.youtube.com/watch?v="+urlcode;
          break;
        case "video":
          returnUrl = "https://www.youtube.com/embed/"+urlcode;
          break;
        case "image":
          returnUrl = "http://img.youtube.com/vi/"+urlcode+"/hqdefault.jpg";
          break;
        default:
          returnUrl = "";
          break;
      }
      return $sce.trustAsResourceUrl(returnUrl);
    }

    function URLClean(url) {
      return $sce.trustAsResourceUrl(url);
    }

    function checkButton(direction, type) {
      var bool = false;

      if(direction == "up"){
        if((vm.displayedReleases[type].page + 1) <= vm.displayedReleases[type].totalpages) {bool = true;}
      }
      else{
        if((vm.displayedReleases[type].page - 1) > 0) { bool = true;}
      }
      return bool;
    }

    function releasePaging(direction, type){
      if(direction == "up"){
        if((vm.displayedReleases[type].page + 1) <= vm.displayedReleases[type].totalpages)
        {
          vm.displayedReleases[type].page +=1;
        }
      }
      else{
        if((vm.displayedReleases[type].page - 1) > 0)
        {
          vm.displayedReleases[type].page -=1;
        }
      }
      var first = itemDisplayMax * (vm.displayedReleases[type].page  - 1);
      vm.displayedReleases[type].releases = (type != "mixtapes" ? vm.allReleases[type].slice(first,first+ itemDisplayMax) : vm.allReleases[type][(vm.displayedReleases[type].page  - 1)]);
    }

  }]);

})();
