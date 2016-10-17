(function () {
	"use strict";
		angular.module('dataconfig', []);
		angular.module('config', [ 'ngMaterial' ]);
		angular.module('headerCtrl', ['ui.bootstrap']);
		angular.module('homeCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('artistsCtrl', ['ui.bootstrap', 'ngAnimate']);
		angular.module('directives', []);

		/**/
    angular.module('MCEApp', ['ngMaterial','ngAnimate', 'ngScrollbars','ui.router', 'dataconfig', 'config','directives','headerCtrl','homeCtrl','artistsCtrl']);

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
            return returnArtist;
          }
        },
        events: {
          all: function(){
            return events;
          }
        },
        news: {
          all: function(){
            return news;
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
                  {"title":"Dirty Work", "type":"spinrilla-mixtape", "date":new Date("2016-07-12"), "url":"https://spinrilla.com/mixtapes/gandhi-ali-dirty-work/embed","text":"Drty Work by Gandhi Ali"},
                  {"title":"SoundCloudProfile", "type":"soundcloud-profile","date":"","url":"https://soundcloud.com/gandhi3x","text":"Gandhi Ali Sound Cloud Profile"},
                  {"title":"New Ballin feat. J.A.", "type":"youtube","date":new Date("2015-11-13"),"url":"https://www.youtube.com/embed/WCuePpLdgdc","text":"New Ballin feat. J.A.", "art":"art/new_ballin.PNG"},
                  {"title":"100 Remix", "type":"sitetrack","date":new Date("2015-12-01"),"url":"GandhiAli-100Remix.mp3","text":"100 remixed by Gandhi Ali"},
                  {"title":"Flavors", "type":"sitetrack","date":new Date("2015-12-01"),"url":"GandhiAli-flavors.mp3","text":"Flavors track"},
                  {"title":"Jumpman Remix", "type":"sitetrack","date":new Date("2015-12-01"),"url":"GandhiAli-jumpman.mp3","text":"Jumpman remixed by Gandhi Ali"},
                  {"title":"Real Live", "type":"youtube","date":new Date("2015-08-20"),"url":"https://www.youtube.com/embed/UwYWQNkdF1Y","text":"The first track on Mind Control Empire"},
                  {"title":"Poetic Justice Freestyle", "type":"youtube","date":new Date("2015-02-13"),"url":"https://www.youtube.com/embed/-JYqJd3irRw","text":"A freestyle to the classic poetic justice track"},
                  {"title":"Call Em In", "type":"youtube","date":new Date("2016-02-04"),"url":"https://www.youtube.com/embed/OUaHK84TkBY","text":"'Call Em In' video produced by DWJproductions", "art":"art/Call_em_in.PNG"},
                  {"title":"Loyal", "type":"youtube","date":new Date("2016-02-25"),"url":"https://www.youtube.com/embed/j5kak2e0S-8","text":"'Loyal' video produced by DWJproductions"},
                  {"title":"Whole Time", "type":"youtube","date":new Date("2016-02-11"),"url":"https://www.youtube.com/embed/aM2K9vl5Z2Y","text":"'Whole Time' video produced by DWJproductions"},
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
              {"name":"'G'", "position":"CEO", "icon":"fa-building", "bio":"", "social":[{"site":"twitter", "handle":"Sir_CEO"}, {"site":"instagram", "handle":"CEO_KING_FIELDMOB"}]},
              {"name":"Dwayne", "position":"Videographer & Photographer", "icon":"fa-video-camera", "bio":"", "social":[{"site":"twitter", "handle":"DWJproductions"}]},
              {"name":"Drty Warhaul", "position":"Producer", "icon":"fa-headphones", "bio":"", "social":[{"site":"twitter", "handle":"inspiredmindz"}]}
              ],
          "news":[
              {"title":"SXSW Performance", "date":new Date("2016-03-18 00:00:00"), "img":"imgs/site-images/Gandhi-sxsw.png", "content":"GANDHI Ali will be performing at this years SXSW (South By Southwest) music festival in Austin, TX. Visit http://www.sxsw.com/music for event and ticket information.", "tags":["GANDHI ALI","SXSW"]},
              {"title":"GANDHI Ali is releasing Drty Work Vol. 1", "date":new Date("2016-02-25 00:00:00"), "img":"imgs/art/DrtyWorkCover.jpg", "content":"GANDHI Ali is releasing Drty Work Vol. 1 produced by Drty Warhol in late February.  The Mixtape will be released here, Live Mixtapes, Spinrilla, & Soundcloud", "tags":["GANDHI ALI","Drty Work Vol. 1"]},
              {"title":"Website Launch", "date":new Date("2015-12-03 00:00:00"), "content":"The New Mind Control Empire website has officially been launched.  Welcome to the new Mind Control Empire Website", "tags":["Website","Mind Control Empire"]},
              {"title":"Drty Warhol Vol.1 coming soon", "date":new Date("2015-12-02 00:00:00"), "content":"Drty Warhol Vol.1 Mixtape coming in January will be released on the site.", "tags":["Mixtape","Mind Control Empire"], "image":"art/DrtyWorkCover.jpg"},
              {"title":"'The City' on the way", "date":new Date("2015-12-02 00:00:00"), "content":"The Video for 'The City' will be released this December.", "tags":["Video","Mind Control Empire"]}
              ],
          "spotlights":[
              {"order":1, "artist":"GANDHI ALI","title":"Loyal", "type":"youtube","date":"2016-02-25","urlcode":"j5kak2e0S-8","text":"'Loyal' video produced by DWJproductions"},
              {"order":2, "artist":"GANDHI ALI","title":"Whole Time", "type":"youtube","date":"2016-02-11","urlcode":"aM2K9vl5Z2Y","text":"'Whole Time' video produced by DWJproductions"},
              {"order":3, "artist":"GANDHI ALI", "title":"Call Em In", "type":"youtube","date":"2016-02-04","urlcode":"OUaHK84TkBY","text":"Call Em In video produced by DWJproductions"},
              {"order":4, "artist":"GANDHI ALI", "title":"New Ballin feat. J.A.", "type":"youtube","date":"2015-11-13","urlcode":"WCuePpLdgdc","text":"New Ballin feat. J.A."}
            ],
          "slider": [{"image":"imgs/slider/IMG0.jpg", "title":"Mind Control Empire", "text":""}, {"image":"imgs/art/RadioRemix.jpg", "title":"RADIO REMIX VOL 1 RELEASE", "text":"Download Now on spinrella.com"}, {"image":"imgs/art/DrtyWorkCover.jpg", "title":"DRTY WORKs VOL. 1", "text":"Releasing Soon"}, {"image":"imgs/slider/MCE1.jpg", "title":"Music Production And Management", "text":"Our Management team brings the world to the artist."}]
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

  angular.module('headerCtrl').controller('HeaderController', ['$state', function($state){
    var vm = this;
    vm.checkActivePage = checkActivePage;

    function checkActivePage(current) {
         var currentPage = $state;
         if (currentPage != null && currentPage.current.name.indexOf(current) > -1) { return true; }
         else { return false; }
    }
    

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