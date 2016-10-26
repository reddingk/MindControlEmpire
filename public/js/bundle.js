(function () {
	"use strict";
		angular.module('dataconfig', []);
		angular.module('config', [ 'ngMaterial' ]);
		angular.module('headerCtrl', ['ui.bootstrap']);
		angular.module('homeCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('artistsCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('empireCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('newsCtrl', ['ui.bootstrap', 'ngAnimate', 'ngSanitize']);
		angular.module('eventsCtrl', ['ui.bootstrap', 'ngAnimate', 'ui.calendar']);
		angular.module('releasesCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('contactUsCtrl', ['ui.bootstrap', 'ngAnimate']);

		angular.module('directives', []);

		/**/
    angular.module('MCEApp', ['ngMaterial','ngAnimate', 'ngScrollbars','ui.router', 'dataconfig', 'config','directives','headerCtrl','homeCtrl','artistsCtrl','empireCtrl','newsCtrl','eventsCtrl','releasesCtrl','contactUsCtrl']);

})();

(function(){
  'use strict';

  angular
    .module('dataconfig')
    .service('mceInfo', [ 'MCEData', '$filter', function MCEInfo(MCEData, $filter){
      var artists = MCEData.siteData.artists;
      var events = MCEData.siteData.events;
      var news = MCEData.siteData.news;
      var mcempire = MCEData.siteData.mcempire;
      var spotlights = MCEData.siteData.spotlights;
      var slider = MCEData.siteData.slider;

      function eventsByname(name, max) {
        var returnedEvents=[];

        for(var i =0; i < events.length; i++){
          if(events[i].artistname == name && returnedEvents.length <= max){
            returnedEvents.push(events[i]);
          }
        }
        return returnedEvents;
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
        }
      }
    }])
    .factory("MCEData", ['$q', '$http', function($q, $http){
     function MCEInfoData() {
       var vm = this;


       vm.siteData = {
          "artists":[
              {"name":"GANDHI ALI", "quote":"Real Live", "bio":"Mind Control Empire's first solo artist","image":"GandhiAli/GandhiAli.png",
                "addimages":["GandhiAli/GandhiAli1.jpg","GandhiAli/GandhiAli2.jpg","GandhiAli/GandhiAli3.jpg","GandhiAli/GandhiAli4.jpg","GandhiAli/GandhiAli5.jpg","GandhiAli/GandhiAli6.jpg","GandhiAli/GandhiAli7.jpg"],
              "social":[
                  {"site":"twitter","handle":"gandhi3x"},
                  {"site":"instagram","handle":"gandhi3x"},
                  {"site":"soundcloud","handle":"gandhi3x"}],
              "releases":[
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
              {"name":"Dwayne", "position":"Videographer & Photographer", "img":"site-images/Dwayne.png","icon":"fa-video-camera", "bio":"", "social":[{"site":"twitter", "handle":"DWJproduction"}, {"site":"instagram", "handle":"DWJproduction"}]},
              {"name":"Drty Warhaul", "position":"Producer", "img":"site-images/Fields.jpg", "icon":"fa-headphones", "bio":"", "social":[{"site":"twitter", "handle":"inspiredmindz"},{"site":"soundcloud", "handle":"inspiredmindz"}]}
              ],
          "news":[
              {"title":"SXSW Performance", "date":new Date("2016-03-18 00:00:00"), "img":"imgs/site-images/Gandhi-sxsw.png", "content":"GANDHI Ali will be performing at this years SXSW (South By Southwest) music festival in Austin, TX. Visit http://www.sxsw.com/music for event and ticket information.", "tags":["GANDHI ALI","SXSW"]},
              {"title":"GANDHI Ali is releasing Drty Work Vol. 1", "date":new Date("2016-02-25 00:00:00"), "img":"imgs/art/DrtyWorkCover.jpg", "content":"GANDHI Ali is releasing Drty Work Vol. 1 produced by Drty Warhol in late February.  The Mixtape will be released here, Live Mixtapes, Spinrilla, & Soundcloud", "tags":["GANDHI ALI","Drty Work Vol. 1"]},
              {"title":"Website Launch", "date":new Date("2015-12-03 00:00:00"), "content":"The New Mind Control Empire website has officially been launched.  Welcome to the new Mind Control Empire Website", "tags":["Website","Mind Control Empire"]},
              {"title":"Drty Warhol Vol.1 coming soon", "date":new Date("2015-12-02 00:00:00"), "content":"Drty Warhol Vol.1 Mixtape coming in January will be released on the site.", "tags":["Mixtape","Mind Control Empire"], "image":"art/DrtyWorkCover.jpg"},
              {"title":"'The City' on the way", "date":new Date("2015-12-02 00:00:00"), "content":"The Video for 'The City' will be released this December.", "tags":["Video","Mind Control Empire"]}
              ],
          "spotlights":[
              {"order":1, "artist":"GANDHI ALI","title":"Chocolate City (Teaser)", "type":"youtube","date":"2016-08-25","urlcode":"LUHaEGtSHmc","text":"Walk with Gandhi Ali as he takes his new song through DC aka 'Chocolate City'"},
              {"order":2, "artist":"GANDHI ALI", "title":"100%", "type":"youtube","date":"2015-06-17","urlcode":"vKIc3P1o798","text":"'100%' video produced by DWJproductions"},
              {"order":3, "artist":"GANDHI ALI", "title":"Tell The People", "type":"youtube","date":"2015-06-09","urlcode":"H0G2iBe0axQ","text":"'Tell The People' video produced by DWJproductions"},
              {"order":4, "artist":"GANDHI ALI","title":"Interview & Cypher @ The Eddie Kayne Show", "type":"youtube","date":"2015-11-05","urlcode":"dIi6AySJsI0","text":"Interview and Cypher with Gandhi Ali on the The Eddie Kayne Show"}
            ],
          "slider": [{"image":"imgs/slider/IMG0.jpg", "title":"Mind Control Empire", "text":""}, {"image":"imgs/art/DrtyWorkCover.jpg", "title":"New Release: DRTY WORKs VOL. 1", "text":"Download now on Spinrilla or Listen on the Releases Page"}, {"image":"imgs/art/RadioRemix.jpg", "title":"RADIO REMIX VOL. 1", "text":"Download Now on spinrella.com"}, {"image":"imgs/slider/MCE1.jpg", "title":"Music Production And Management", "text":"Our Management team brings the world to the artist."}]
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



      $urlRouterProvider.otherwise('/');
      //$locationProvider.html5Mode(true);
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
      vm.allReleases = {"videos":[], "mixtapes":[], "profiles":[]};

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
      }

      vm.displayedReleases = {
        "imgs":{"page":1, "totalpages":Math.ceil(vm.artistProfile.addimages.length / 4), "display": vm.artistProfile.addimages.slice(0,4)},
        "videos":{"page":1, "totalpages":Math.ceil(vm.allReleases.videos.length / itemDisplayMax), "releases":vm.allReleases.videos.slice(0,3)},
        "mixtapes":{"page":1, "totalpages":vm.allReleases.mixtapes.length , "releases":vm.allReleases.mixtapes[0]},
        "profiles":vm.allReleases.profiles
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
     navMain.on("click", "a", null, function () {
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
          var topThreshHold = offsetTop - selectOffset;
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
